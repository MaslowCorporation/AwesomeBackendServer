/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} workQueue
 *
 * @returns 200 or 423
 */
export async function GetJobByID({ req, res, workQueue }) {
  // during debug, can be used to know how many jobs are in the queue
  //const allJobs = await workQueue.getJobs();
  //console.log(`There are ${allJobs?.length} jobs in the queue.`);

  // the id of the desired job
  let id = req?.params?.id;

  // job.data contains the custom data passed when the job was created
  // job.id contains id of this job.
  let job = await workQueue.getJob(id);

  // if this job doesn't exist in the queue
  if (job === null) {
    // the adventure stops there, buddy
    res.status(423).send("This job doesn't exist: " + id);

    return 423;
  } else {
    // the job exists in the queue ! Let's return the crucial data related to this job
    let state = await job?.getState();
    let progress = job?._progress;
    let reason = job?.failedReason;
    let data = job?.data;
    let returnvalue = job?.returnvalue;

    // if the shizzle has successfully completed
    if (["completed", "failed"].includes(state)) {
      job?.remove();
    }

    res.json({
      // the id of the job
      id,

      /**
       *
       * The state of the job. One of:
       *
       * completed,
       * failed,
       * delayed,
       * active,
       * waiting,
       * paused,
       * stuck,
       * null
       *
       *
       */
      state,

      // the numeric progress of the work
      // 
      // typically a number from 0 to 100. 
      // But it can be any serializable data of your liking
      progress,

      // the output value when the job successfully completed
      returnvalue,

      // The initial data passed to the job.
      //
      // This data can be updated from within the job,
      // so update data can be passed to the frontend/client.
      // I set it to null, because sometimes, the data can be heavy, like a file buffer,
      // so in order to have lightweight responses, lift the weight off.
      data: null,

      // the error reason/msg, if shit got sour
      reason
    });

    return 200;
  }
}
