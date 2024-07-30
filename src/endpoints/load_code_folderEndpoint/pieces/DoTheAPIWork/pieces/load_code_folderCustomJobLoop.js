
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { GetPromptTokensLength } from "../../../../../services/GetPromptTokensLength/GetPromptTokensLength.js";
import { CreateFirestoreDocument, GetFirestoreDocument, UpdateFirestoreDocument } from "../../../../../services/FirestoreCRUD/FirebaseCRUD.js";

/**
 * 
 * @param {*} job 
 * 
 * @returns your own shizzle
 */
export async function load_code_folderCustomJobLoop(job) {
  /**
   * Some useful info:
   * 
   * - job.data contains the args 
   * you have passed in the load_code_folderLongWork.js file.
   * 
   * - job.progress() is a method that allows you to save serializable progress data
   * that the user can get using the get_work_status endpoint.
   * 
   * Code written thx to
   * 
   * https://js.langchain.com/v0.1/docs/use_cases/code_understanding/#use-case
   */

  const docsJS = job.data.JS_FILES;
  const userId = job.data.userId; // Ensure this is passed in job.data

  const hashedAPIKey = job.data.hashedAPIKey;

  const folderName = hashedAPIKey + "_" + userId;

  // Add userId to each document's metadata
  const docsWithUserId = docsJS.map(doc => ({
    ...doc,
    metadata: {
      ...doc.metadata,
      userId: folderName,
    }
  }));


  const foldersData = await GetFirestoreDocument({
    collectionName: "AIFolders",
    documentId: hashedAPIKey,
  });

  if (foldersData) {
    foldersData[userId] = {
      folderName: userId,
      created: Date.now(),
    };

    // store the folder id in the Firestore database
    await UpdateFirestoreDocument({
      documentId: hashedAPIKey,
      collectionName: "AIFolders",
      updateData: foldersData,
    });

    console.log("folder updated from AIFolders");
  } else {
    const foldersData = {};
    foldersData[userId] = {
      folderName: userId,
      created: Date.now(),
    };

    // store the folder id in the Firestore database
    await CreateFirestoreDocument({
      documentId: hashedAPIKey,
      collectionName: "AIFolders",
      documentData: foldersData
    });

    console.log("folder added to AIFolders");
  }

  // Extract source paths
  const sourcePaths = docsWithUserId.map(doc => doc.metadata.source);

  const javascriptSplitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
    chunkSize: 2000,
    chunkOverlap: 200,
  });
  const texts = await javascriptSplitter.splitDocuments(docsWithUserId);

  console.log("Loaded ", texts.length, " documents.");

  const model_chosen = "text-embedding-ada-002";
  const qty_tokens = CalculateEmbeddingsTokenSize(texts, model_chosen);

  const privateKey = process.env.SUPABASE_PRIVATE_KEY;
  if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

  const url = process.env.SUPABASE_URL;
  if (!url) throw new Error(`Expected env var SUPABASE_URL`);

  const client = createClient(url, privateKey);

  // Delete rows with matching source paths and userId in batches
  await deleteDocumentsInBatches(client, sourcePaths, folderName);

  const vectorStore = await SupabaseVectorStore.fromDocuments(
    texts,
    new OpenAIEmbeddings(),
    {
      client,
      tableName: "documents",
      queryName: "match_documents",
    }
  );

  const retriever = vectorStore.asRetriever({
    searchType: "mmr", // Use max marginal relevance search
    searchKwargs: { fetchK: 5 },
  });

  return { model_chosen, qty_tokens };
}

async function deleteDocumentsInBatches(
  client,
  sourcePaths,
  userId,
  batchSize = 100,
) {

  for (let i = 0; i < sourcePaths.length; i += batchSize) {
    const batch = sourcePaths.slice(i, i + batchSize);

    const { error: deleteError } = await client
      .from('documents')
      .delete()
      .eq('metadata->>userId', userId)
      .in('metadata->>source', batch);

    if (deleteError) {
      console.error('Error deleting documents:', deleteError);
      throw new Error('Failed to delete documents');
    } else {
      console.log("Old vector documents deleted successfully!");
    }
  }
}

/*
function CalculateEmbeddingsTokenSize(texts, embedding_model_name) {
  let token_size = 0;

  for (var i = 0; i < texts.length; i++) {
    const text = texts[i];

    const textContent = text.pageContent;

    const text_tok_size = GetPromptTokensLength(embedding_model_name, textContent);

    token_size += text_tok_size;
  }

  return token_size;
}
*/

function CalculateEmbeddingsTokenSize(texts, embedding_model_name) {
  let promptSpaghetti = "";

  for (var i = 0; i < texts.length; i++) {
    const text = texts[i];

    const textContent = text.pageContent;

    promptSpaghetti += textContent;
  }

  const text_tok_size = GetPromptTokensLength(embedding_model_name, promptSpaghetti);

  return text_tok_size;
}