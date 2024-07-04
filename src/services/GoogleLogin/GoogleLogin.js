import axios, { AxiosError } from 'axios';




export async function getGoogleLoginCode(clientId) {
    try {
        const data = new URLSearchParams();
        data.append('client_id', clientId);
        data.append('scope', 'email profile');

        const response = await axios.post('https://oauth2.googleapis.com/device/code', data);

        // Return the response data if the request is successful
        return response.data;
    } catch (error) {
        // Log and return null if there's an error
        console.error(error);
        return null;
    }
}

async function wait(interval) {
  
  return new Promise(resolve => setTimeout(resolve, interval * 1000));
}

async function pollTokenEndpoint(clientId, clientSecret, deviceCode, grantType, tokenEndpoint, maxDuration, interval) {
  

  const startTime = Date.now();
  let elapsedTime = 0;

  while (elapsedTime < maxDuration * 1000) {
    
    const data = new URLSearchParams();
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);
    data.append('code', deviceCode);
    data.append('grant_type', grantType);

    try {
      //console.log(`Let's try to check the login status.....`)
      
      const response = await axios.post(tokenEndpoint, data);
      const errorResponse = response.data;

      

      if (errorResponse) {
        if (errorResponse.error === 'authorization_pending') {
          //console.log(`Let's wait ${interval} seconds before checking again.....`)
          // Do nothing and continue polling
        } else if (errorResponse.error === 'slow_down') {
          //console.log(`Let's slow down.....`)
          await wait(interval);
        } else if (errorResponse.access_token) {
          console.log(`Success ! Login is OK`);

          return errorResponse;
        } else {
          //console.error('Error in getting tokens:', errorResponse);
          return null;
        }
      } else {
        //console.error('Error in getting tokens:', errorResponse);
        return null;
      }
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        const errorResponse = axiosError.response?.data;

        if (errorResponse) {
          if (errorResponse.error === 'authorization_pending') {
            // Do nothing and continue polling
            //console.log(`Let's wait ${interval} seconds before checking again.....`)
          } else if (errorResponse.error === 'slow_down') {
            //console.log(`Let's slow down.....`)
            await wait(interval);
          } else {
            //console.error('Error in getting tokens:', errorResponse);
            return null;
          }
        }
      } else {
        
        console.error('Non-Axios error occurred:', error);
        return null;
      }
    }

    await wait(interval);
    elapsedTime = Date.now() - startTime;
  }

  console.log('Token request timed out');
  return null;
}

export async function getGoogleTokens(clientId, clientSecret, deviceCode, interval, maxDuration) {
  
  const tokenEndpoint = 'https://oauth2.googleapis.com/token';
  const grantType = 'http://oauth.net/grant_type/device/1.0';

  try {
    
    const tokens = await pollTokenEndpoint(clientId, clientSecret, deviceCode, grantType, tokenEndpoint, maxDuration, interval);
    return tokens;
  } catch (error) {
    
    console.error('Error in getting tokens:', error);
    return null;
  }
}
