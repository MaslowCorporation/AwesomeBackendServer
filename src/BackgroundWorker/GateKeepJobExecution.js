export async function GateKeepJobExecution(job) {
  

  if (!job.data.job_executed) {
    console.log(`The job ${job.id} is running for the first time. The adventure starts here ;-)`);

    // add it in the basket of offenders
    // indicate that this job got executed once
    job.data.job_executed = true;

    await job.update(job.data);

    return true;
  }

  // if this job is a repeating offender
  else {
    // the adventure stops here
    console.log(`The job ${job.id} is a repeating offender. The adventure stops here ;-)`);

    return false;
  }
}
