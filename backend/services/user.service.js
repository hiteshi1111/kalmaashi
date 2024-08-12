const axios = require('axios');
const { response } = require('express');

let service = {};

service.createCustomer = createCustomer;
service.customerLogin = customerLogin;
service.fetchUserData = fetchUserData;
service.fetchDataViaToken = fetchDataViaToken;
service.updateCustomer = updateCustomer;
service.addNewAddress = addNewAddress;
service.fetchAllAddress = fetchAllAddress;
service.deleteAddress = deleteAddress;

// function createCustomer(body) {
//   const options = {
//     method: 'POST',
//     url: `https://${process.env.SHOPIFY_SHOP_URL}/admin/api/2024-01/customers.json`,
//     headers: {
//       'X-Shopify-Access-Token': `${process.env.SHOPIFY_ACCESS_TOKEN}`,
//       'Content-Type': 'application/json'
//     },
//     data: {
//       customer: {
//         email: body.email,
//         first_name: body.firstName,
//         last_name: body.lastName,
//         password: body.password,
//         phone: body.phoneNumber,
//         password_confirmation: body.passwordConfirmation
//       }
//     }
//   };

//   return axios.request(options).then(function (response) {
//     const data = response.data.customer;
//     return data;
//   })
//   .catch(function (error) {
//     console.log("error >>>", error.response.data)
//     throw error.response?.data;
//   });
// }
function convertKeysAndJoinErrors(errorObj) {
  const convertedErrors = {};
  for (const key in errorObj) {
    // Convert keys: remove underscores and change the next character to uppercase
    const newKey = key.replace(/_./g, match => match.charAt(1).toUpperCase());
    convertedErrors[newKey] = errorObj[key].join(', '); // Join error messages into a single string
  }
  return convertedErrors;
}

function createCustomer(body) {
  const options = {
    method: 'POST',
    url: `https://${process.env.SHOPIFY_SHOP_URL}/admin/api/2024-01/customers.json`,
    headers: {
      'X-Shopify-Access-Token': `${process.env.SHOPIFY_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: {
      customer: {
        email: body.email,
        first_name: body.firstName,
        last_name: body.lastName,
        password: body.password,
        phone: body.phoneNumber,
        password_confirmation: body.passwordConfirmation
      }
    }
  };


  return axios.request(options)
    .then(function (response) {
      const data = response.data.customer;
      return data;
    })
    .catch(function (error) {
      console.error("Error:", error.response.data.errors); // Log the error for debugging
      if (error.response.data.errors) {
        const errors = convertKeysAndJoinErrors(error.response.data.errors);
        return Promise.reject({ errors }); // Reject with errors in expected format
      } else {
        // If error structure is not as expected, reject with a generic error message
        return Promise.reject({ message: 'An unexpected error occurred while creating the customer.' });
      }
    });
}


function customerLogin(body) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: `https://${process.env.SHOPIFY_SHOP_URL}/api/2024-01/graphql.json`,
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      data: {
        query: `
          mutation SignInWithEmailAndPassword($email: String!, $password: String!) {
            customerAccessTokenCreate(input: {
              email: $email,
              password: $password
            }) {
              customerAccessToken {
                accessToken
                expiresAt
              }
              customerUserErrors {
                code
                message
              }
            }
          }
        `,
        variables: {
          email: body.email,
          password: body.password
        }
      }
    };

    axios.request(options)
      .then(function (response) {

        const accessTokenData = response.data.data.customerAccessTokenCreate; 
        if (accessTokenData.customerAccessToken) {
          // Fetch customer data using the access token
          const userDataPromise = fetchUserData(accessTokenData.customerAccessToken.accessToken);
          userDataPromise.then(userData => {
            const responseData = {
              accessToken: accessTokenData.customerAccessToken.accessToken,
              expiresAt: accessTokenData.customerAccessToken.expiresAt,
              userData: userData.data.customer
            };
            resolve(responseData);
          }).catch(error => {
            reject(error);
          });
        } else {
          // Check if there are user errors
          const errors = accessTokenData.customerUserErrors;
          if (errors && errors.length > 0) {
            reject(new Error("Email or password is incorrect!"));
          } else {
            reject(new Error('Unknown error occurred during login'));
          }
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

function fetchUserData(accessToken) {
  const options = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://${process.env.SHOPIFY_SHOP_URL}/api/2024-01/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      'Content-Type': 'application/json'
    },
    data: {
      query: `query {
        customer(customerAccessToken: "${accessToken}") {
          id
          firstName
          lastName
          email
          phone
          createdAt
        }
      }`,
      variables: {}
    }
  };

  return axios.request(options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function fetchDataViaToken(token) {
  let data = JSON.stringify({
    query: `query FetchCustomerInfo($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        email
        firstName
        id
        lastName
        phone
      }
    }`,
    variables: { "customerAccessToken": token }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://${process.env.SHOPIFY_SHOP_URL}/api/2024-01/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios.request(config).then((response) => {
    const responseData = response.data;
    if (responseData.data && responseData.data.customer === null) {
      throw new Error('Invalid token or customer not found');
    }
    return responseData;
  }).catch((error) => {
    if (error.code === 'ECONNABORTED' || error.response.status >= 500) {
      throw new Error('Network error or server issue occurred');
    } else if (error.response && error.response.data) {
      const graphqlErrors = error.response.data.errors;
      if (graphqlErrors && graphqlErrors.length > 0) {
        const errorMessage = graphqlErrors.map(err => err.message).join('; ');
        throw new Error(`GraphQL error: ${errorMessage}`);
      }
    }
    throw error;
  });
}


function updateCustomer(body, customer_id) {
  const options = {
    method: 'PUT',
    url: `https://${process.env.SHOPIFY_SHOP_URL}/admin/api/2024-01/customers/${customer_id}.json`,

    headers: {
      'X-Shopify-Access-Token': `${process.env.SHOPIFY_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },

    data: {
      customer: {
        first_name: body.first_name,
        last_name: body.last_name,
      }
    }
  };
  return axios.request(options)
    .then(() => {
      return { success: true };

    })
    .catch((error) => {
      throw error;
    });
}


async function addNewAddress(body, customer_id) {
  try {

    const customerObject = {
      customer_address: {
        first_name: body.first_name,
        last_name: body.last_name,
        phone: body.phone,
        city: body.city,
        zip: body.zip,
        address1: body.address,
        province: body.state,
        country: body.country

      }
    };

    const options = {
      method: 'POST',
      url: `https://${process.env.SHOPIFY_SHOP_URL}/admin/api/2024-01/customers/${customer_id}/addresses.json`,
      headers: {
        'X-Shopify-Access-Token': `${process.env.SHOPIFY_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: customerObject
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
}


function fetchAllAddress(customerId) {
  const options = {
    method: 'GET',
    url: `https://${process.env.SHOPIFY_SHOP_URL}/admin/api/2024-01/customers/${customerId}/addresses.json`,
    headers: {
      'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
      'Content-Type': 'application/json',

    }
  };
  return axios.request(options).then((response) => {
    return response.data;
  }).catch((error) => {
    throw error;
  });
}

function deleteAddress(customerId, addressId) {
  const options = {
    method: 'DELETE', // Corrected method name
    url: `https://${process.env.SHOPIFY_SHOP_URL}/admin/api/2024-01/customers/${customerId}/addresses/${addressId}.json`,

    headers: {
      'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
      'Content-Type': 'application/json',

    }
  };
  return axios.request(options).then((response) => {
    if (response.status === 200)
    {
      return { success: true, message: 'Address deleted successfully.' };
    }
  }).catch((error) => {
    throw error;
  });
}




module.exports = service;
