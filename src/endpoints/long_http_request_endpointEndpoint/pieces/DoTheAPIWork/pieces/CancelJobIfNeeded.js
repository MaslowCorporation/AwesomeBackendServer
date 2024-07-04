export async function CancelJobIfNeeded(workQueue, job) {
  const freshJob = await workQueue.getJob(job.id);
  const itsTimeToCancel = freshJob?.data?.cancel != null;

  //console.log(`time to cancel ?: ${JSON.stringify(freshJob.data, null, 2)}`);
  if (itsTimeToCancel) {
    throw new Error("This job has been canceled successfully !");

  }
}
