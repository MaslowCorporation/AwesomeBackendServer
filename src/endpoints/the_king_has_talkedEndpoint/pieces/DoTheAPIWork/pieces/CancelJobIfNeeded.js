export async function CancelJobIfNeeded(workQueue, job) {
  const freshJob = await workQueue.getJob(job.id);
  const itsTimeToCancel = freshJob?.data?.cancel != null;

  if (itsTimeToCancel) {
    throw new Error("This job has been canceled successfully !");

  }
}
