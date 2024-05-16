import rateLimiter from "express-rate-limit";

export function InitRateLimiter(app) {
  // use this line if you’re using a proxy (Heroku, DigitalOcean, etc.); 
  // so req IPs are the client’s IP, not the IP of the proxy service
  app.set("trust proxy", 1);

  
  const rateLimit = rateLimiter({
    // set a rate limit of 200 reqs/min
    max: 200,

    // time where limit applies
    windowMs: 1 * 60 * 1000, 
  });

  // use the rate limit in your Express app
  app.use(rateLimit);
}
