<template>
  <div class="p-6 px-10 bg-base-100 rounded-box">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-warning">Create Account</h2>
    </div>

    <form class="grid grid-cols-1 lg:grid-cols-2 gap-20">
      <!-- Left Column -->
      <div class="space-y-4">
        <!-- Account Information Section -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Account Name</span>
          </label>
          <input type="text" class="input input-bordered w-full" placeholder="Enter account name" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Customer Known Company As</span>
          </label>
          <input type="text" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Customer Parent Company Name</span>
          </label>
          <input type="text" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Account ID (Number)</span>
          </label>
          <input type="number" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Industry</span>
          </label>
          <select class="select select-bordered w-full">
            <option disabled selected>-Select-</option>
            <option>Construction</option>
            <option>Manufacturing</option>
            <option>Technology</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Sub Industry Name</span>
          </label>
          <select class="select select-bordered w-full">
            <option disabled selected>-Select-</option>
            <option>Residential</option>
            <option>Commercial</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Group Name</span>
          </label>
          <select class="select select-bordered w-full">
            <option disabled selected>-Select-</option>
            <option>Group A</option>
            <option>Group B</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Account Level</span>
          </label>
          <select class="select select-bordered w-full">
            <option disabled selected>-Select-</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Deal Status</span>
          </label>
          <select class="select select-bordered w-full">
            <option disabled selected>-Select-</option>
            <option>Open</option>
            <option>Closed</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Deal Potential Status</span>
          </label>
          <select class="select select-bordered w-full">
            <option disabled selected>-Select-</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Lead Priority</span>
          </label>
          <select class="select select-bordered w-full">
            <option disabled selected>-Select-</option>
            <option>Urgent</option>
            <option>High</option>
            <option>Normal</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Lead Source</span>
          </label>
          <select class="select select-bordered w-full">
            <option disabled selected>-Select-</option>
            <option>Referral</option>
            <option>Website</option>
            <option>Trade Show</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Building Category/Construction Type</span>
          </label>
          <select class="select select-bordered w-full">
            <option disabled selected>-Select-</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Industrial</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Phase Of Business/Action Stage Type</span>
          </label>
          <select class="select select-bordered w-full">
            <option disabled selected>-Select-</option>
            <option>Prospecting</option>
            <option>Negotiation</option>
            <option>Closed</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Project Type</span>
          </label>
          <input type="text" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Project Number</span>
          </label>
          <input type="number" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Project Cost</span>
          </label>
          <input type="text" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Project Summary</span>
          </label>
          <textarea class="textarea textarea-bordered w-full"></textarea>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Project Description</span>
          </label>
          <textarea class="textarea textarea-bordered w-full"></textarea>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Next Step Summary</span>
          </label>
          <textarea class="textarea textarea-bordered w-full"></textarea>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">News and Notes</span>
          </label>
          <textarea class="textarea textarea-bordered w-full"></textarea>
        </div>

        <!-- New Fields -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">SSEM Communication Schedule</span>
          </label>
          <select class="select select-bordered w-full">
            <option disabled selected>-Select-</option>
            <option>Weekly</option>
            <option>Bi-weekly</option>
            <option>Monthly</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Account Potential Status</span>
          </label>
          <select class="select select-bordered w-full">
            <option disabled selected>-Select-</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-4">
        <!-- Dates Section -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">CEO's Deal Review Date</span>
          </label>
          <input type="date" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Last Account Review Date</span>
          </label>
          <div class="flex gap-2">
            <input type="date" class="input input-bordered flex-1" />
            <input type="time" class="input input-bordered flex-1" />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Last Email Date</span>
          </label>
          <input type="date" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Payment Received Date</span>
          </label>
          <input type="date" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Latest Proposal Submission Date</span>
          </label>
          <div class="flex gap-2">
            <input type="date" class="input input-bordered flex-1" />
            <input type="time" class="input input-bordered flex-1" />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Proposal Reviewer Completion Date</span>
          </label>
          <input type="date" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Construction Start Date</span>
          </label>
          <input type="date" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Construction End Date</span>
          </label>
          <input type="date" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Sales Completion Target Date</span>
          </label>
          <input type="date" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Closing Date</span>
          </label>
          <input type="date" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Original Data Input Date</span>
          </label>
          <input type="date" class="input input-bordered w-full" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">SSEM Communication Schedule Date</span>
          </label>
          <div class="flex gap-2">
            <input type="date" class="input input-bordered flex-1" />
            <input type="time" class="input input-bordered flex-1" />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Sales Executive Call Back Schedule (SEC)</span>
          </label>
          <div class="flex gap-2">
            <input type="date" class="input input-bordered flex-1" />
            <input type="time" class="input input-bordered flex-1" />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Sales Executive Last Call Date (SEC)</span>
          </label>
          <div class="flex gap-2">
            <input type="date" class="input input-bordered flex-1" />
            <input type="time" class="input input-bordered flex-1" />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Sales Executive Last Note Date (SEC)</span>
          </label>
          <div class="flex gap-2">
            <input type="date" class="input input-bordered flex-1" />
            <input type="time" class="input input-bordered flex-1" />
          </div>
        </div>

        <!-- Dropdowns Section -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">SSEM Call Importance</span>
          </label>
          <select class="select select-bordered w-full">
            <option disabled selected>-Select-</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Sales Target Year - Quarter</span>
          </label>
          <select class="select select-bordered w-full">
            <option disabled selected>-Select-</option>
            <option>Q1 2023</option>
            <option>Q2 2023</option>
            <option>Q3 2023</option>
          </select>
        </div>

        <!-- Text Fields Section -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">SSEM Work Notes</span>
          </label>
          <textarea class="textarea textarea-bordered w-full"></textarea>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Sales Executive Notes (SEC)</span>
          </label>
          <textarea class="textarea textarea-bordered w-full"></textarea>
        </div>

        <!-- Checkbox Fields -->
        <div class="form-control">
          <label class="cursor-pointer label justify-start gap-2">
            <input type="checkbox" class="checkbox checkbox-primary" />
            <span class="label-text">LinkedIn - Navigator Message Sent</span>
          </label>
        </div>

        <div class="form-control">
          <label class="cursor-pointer label justify-start gap-2">
            <input type="checkbox" class="checkbox checkbox-primary" />
            <span class="label-text">Account Review Status - Direct Call</span>
          </label>
        </div>

        <div class="form-control">
          <label class="cursor-pointer label justify-start gap-2">
            <input type="checkbox" class="checkbox checkbox-primary" />
            <span class="label-text">Account Review Status - SRVR Review (Proposals)</span>
          </label>
        </div>

        <div class="form-control">
          <label class="cursor-pointer label justify-start gap-2">
            <input type="checkbox" class="checkbox checkbox-primary" />
            <span class="label-text">Account Review Status - Data Warehouse Review</span>
          </label>
        </div>
      </div>
    </form>

    <!-- Billing Information Section -->
    <div class="mt-6 p-4 bg-base-200 rounded-box">
      <h3 class="text-lg font-semibold mb-4">Billing Information</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Billing Street</span>
          </label>
          <input type="text" class="input input-bordered w-full" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Billing City</span>
          </label>
          <input type="text" class="input input-bordered w-full" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Billing State</span>
          </label>
          <input type="text" class="input input-bordered w-full" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Billing County</span>
          </label>
          <input type="text" class="input input-bordered w-full" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Billing Zip Code</span>
          </label>
          <input type="text" class="input input-bordered w-full" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Billing Country</span>
          </label>
          <input type="text" class="input input-bordered w-full" />
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end mt-8 gap-3">
      <button class="btn btn-ghost">Cancel</button>
      <button class="btn btn-outline btn-primary">Save and New</button>
      <button class="btn btn-primary">Save</button>
    </div>
  </div>
</template>

<script setup>
// No specific logic here yet
</script>

<style scoped>
/* Optional custom styling */
</style>