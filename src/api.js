import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    console.log("🔍 api.js - Current token:", JoblyApi.token);

    const params = method === "get" ? data : {};

    try {
      const res = await axios({ url, method, data, params, headers });
      return res.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // --------------------
  // 🚀 AUTH METHODS
  // --------------------

  /** Login user and return token */
  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  /** Signup new user and return token */
  static async signup(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  // --------------------
  // 🏢 COMPANY METHODS
  // --------------------

  /** Get all companies, optionally filter by name */
  static async getCompanies(searchTerm = "") {
    let res = await this.request("companies", searchTerm ? { name: searchTerm } : {});
    return res.companies;
  }

  /** Get details of a single company */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // --------------------
  // 💼 JOB METHODS
  // --------------------

  /** Get all jobs, optionally filter by title */
  static async getJobs(searchTerm = "") {
    let res = await this.request("jobs", searchTerm ? { title: searchTerm } : {});
    return res.jobs;
  }

  /** Apply to a job */
  static async applyToJob(username, jobId, updateUserApplications) {
    try {
      let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  
      // ✅ Call the passed-in function to update applied jobs in React state
      if (updateUserApplications) {
        updateUserApplications(jobId);
      }
  
      console.log(`✅ Successfully applied to job ${jobId}`);
      return res.applied;
    } catch (err) {
      console.error(`❌ Error applying to job ${jobId}:`, err);
  
      // ✅ Handle "already applied" error
      if (err.response && err.response.status === 400) {
        alert("You have already applied to this job.");
      }
    }
  }
  
  
  
  // --------------------
  // 👤 USER METHODS
  // --------------------

  /** Get user details */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);

    if (!res.user) {
      throw new Error("User data not found in API response");
    }
    return res.user;
  }

  /** Update user details */
  static async updateUser(username, data ) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  static async getUserApplications(username) {
    let res = await this.request(`users/${username}`);
    return res.user.applications; // ✅ Ensure applications are returned correctly
  }
  

}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";



export default JoblyApi;
