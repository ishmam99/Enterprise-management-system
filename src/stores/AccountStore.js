import { defineStore } from 'pinia';

export const useAccountsStore = defineStore('accountsStore', {
  state: () => ({
    allColumns: [
      'SSEM Communication Schedule',
      'SSEM Call Importance',
      'SSEM Work Notes',
      'Deal Potential Status',
      'Next Step Summary',
      'Account Name',
      'Customer Known Company As',
      'Customer Parent Company Name',
      'Last Email Date',
      'Deal Status',
      'Account Level',
      'Account ID',
      "CEO's Deal Review Date",
      'Last Account Review Date',
      'Group Name',
      'Sales Executive Caller (SEC)',
      'Sales Executive Last Call Date (SEC)',
      'Last Modified By',
      'Industry',
      'Created By',
      'Sales Completion Target Date',
      'Closing Date',
      'Owner Contact Name',
      'Owner Contact Name 2',
      'Owner Company Name',
      'Owner Contact Title',
      'Owner Contact Title 2',
      'Owner Phone',
      'Owner Phone 2',
      'Owner Fax',
      'Owner Website',
      'Owner City',
      'Owner E-Mail',
      'Owner State',
      'Owner Location Phone 1',
      'Owner Location Phone 2',
      'Owner Address',
      'Lead Sales Executive (SEC)',
      'Billing City',
      'Billing State',
      'Billing County',
      'Billing Zip Code',
      'Billing Street',
      'Billing Country',
      'Account Reviewer',
      'BuildingCategory/ConstructionType',
      'PhaseOfBusiness/ActionStageType',
      'Lead Priority',
      'News and Notes',
      'Account Potential Status',
      'Sub Industry Name',
      'Hoovers -Dodge Industry Name',
      'Dodge Industry Sub-sub-class Name',
      'Payment Received Date',
      'Project Cost',
      'Lead Source',
      'Latest Proposal Submission Date',
      'Proposal Preparer',
      'Proposal Reviewer Name',
      'Proposal Reviewer Completion Date',
      'Project Number',
      'Construction End Date',
      'Construction Start Date',
      'Architect Contact Name',
      'Architect Contact Name 2',
      'Architect Company Name',
      'Architect Website',
      'Architect Address',
      'Architect Phone',
      'Architect Phone 2',
      'Architect Contact Title',
      'Architect Contact Title 2',
      'Architect Location Phone 1',
      'GC Company Name',
      'GC Contact Name 1',
      'GC Contact Name 2',
      'GC Phone 1',
      'GC Phone 2',
      'GC City',
      'GC State',
      'GC E-Mail',
      'GC Zip Code',
      'GC Contact Title 1',
      'GC Contact Title 2',
      'GC Company Website',
      'GC Location Phone 1',
      'GC Location Phone 2',
      'Developer Company Name',
      'Developer Contact Name 1',
      'Developer Contact Name 2',
      'Developer Phone 1',
      'Developer Phone 2',
      'Developer City',
      'Developer State',
      'Developer E-Mail',
      'Developer Zip Code',
      'Developer Contact Title 1',
      'Developer Contact Title 2',
      'Developer Company Website',
      'Developer Location Phone 1',
      'Developer Location Phone 2',
      'Project Type',
      'Project Summary',
      'Original Data Input Date',
      'Sales Target Year -Quarter',
      'Sales Executive Call Back Schedule (SEC)',
      'Sales Executive Notes (SEC)',
      'Sales Executive Last Note Date (SEC)',
      'Project Description'
    ].map(name => ({ name, value: true })),

   tableData: [
  // First Account
  {
    name: 'SSEM Communication Schedule',
    value: 'Bi-weekly'
  },
  {
    name: 'SSEM Call Importance',
    value: 'Medium'
  },
  {
    name: 'SSEM Work Notes',
    value: 'Thank bring thought material else treat main. Owner focus rock say.\nNeed wear trouble gas result. Move research reality around scientist reflect exist. There open cause husband mother fight.'
  },
  {
    name: 'Account Name',
    value: 'Alvarez-Duarte'
  },
  {
    name: 'Customer Known Company As',
    value: 'Inc'
  },
  {
    name: 'Customer Parent Company Name',
    value: 'Zimmerman-Ross'
  },
  {
    name: 'Last Email Date',
    value: '2023-04-21'
  },
  {
    name: 'Deal Status',
    value: 'Open'
  },
  {
    name: 'Account Level',
    value: 'Gold'
  },
  {
    name: 'Account ID',
    value: '1'
  },
  {
    name: "CEO's Deal Review Date",
    value: '2024-09-06'
  },
  {
    name: 'Last Account Review Date',
    value: '2023-12-26'
  },
  {
    name: 'Group Name',
    value: 'Group C'
  },
  {
    name: 'Sales Executive Caller (SEC)',
    value: 'ugallegos'
  },
  {
    name: 'Sales Executive Last Call Date (SEC)',
    value: '2023-06-04'
  },
  {
    name: 'Last Modified By',
    value: 'pkerr'
  },
  {
    name: 'Industry',
    value: 'Education'
  },
  {
    name: 'Created By',
    value: 'ryanamy'
  },
  {
    name: 'Sales Completion Target Date',
    value: 'Q1'
  },
  {
    name: 'Closing Date',
    value: 'Q3'
  },
  {
    name: 'Owner Contact Name',
    value: 'Brian Williamson'
  },
  {
    name: 'Owner Contact Name 2',
    value: 'Michelle Barton'
  },
  {
    name: 'Owner Company Name',
    value: 'King, Rice and Hoffman'
  },
  {
    name: 'Owner Contact Title',
    value: 'Systems developer'
  },
  {
    name: 'Owner Contact Title 2',
    value: 'Journalist, magazine'
  },
  {
    name: 'Owner Phone',
    value: '0054510058'
  },
  {
    name: 'Owner Phone 2',
    value: '001-359-452-4956'
  },
  {
    name: 'Owner Fax',
    value: '8032172785'
  },
  {
    name: 'Owner Website',
    value: 'http://www.jackson-curtis.biz/'
  },
  {
    name: 'Owner City',
    value: 'Julieberg'
  },
  {
    name: 'Owner E-Mail',
    value: 'robertellis@hotmail.com'
  },
  {
    name: 'Owner State',
    value: 'Texas'
  },
  {
    name: 'Owner Location Phone 1',
    value: '428.171.9785x1265'
  },
  {
    name: 'Owner Location Phone 2',
    value: '(437)328-2108'
  },
  {
    name: 'Owner Address',
    value: '620 Kim Alley\nRyanburgh, OK 10085'
  },
  {
    name: 'Lead Sales Executive (SEC)',
    value: 'John Doe'
  },
  {
    name: 'Billing City',
    value: 'West Mark'
  },
  {
    name: 'Billing State',
    value: 'Mississippi'
  },
  {
    name: 'Billing County',
    value: 'New Hampshire'
  },
  {
    name: 'Billing Zip Code',
    value: '78130'
  },
  {
    name: 'Billing Street',
    value: '117 Wilson Lodge Apt. 373'
  },
  {
    name: 'Billing Country',
    value: 'British Indian Ocean Territory (Chagos Archipelago)'
  },
  {
    name: 'Account Reviewer',
    value: 'fdelgado'
  },
  {
    name: 'BuildingCategory/ConstructionType',
    value: 'Residential'
  },
  {
    name: 'PhaseOfBusiness/ActionStageType',
    value: 'Planning'
  },
  {
    name: 'Lead Priority',
    value: 'Medium'
  },
  {
    name: 'Account Potential Status',
    value: 'Confirmed'
  },
  {
    name: 'Sub Industry Name',
    value: 'Healthcare'
  },
  {
    name: 'Hoovers -Dodge Industry Name',
    value: 'Pharma'
  },
  {
    name: 'Dodge Industry Sub-sub-class Name',
    value: 'Web Dev'
  },
  {
    name: 'Payment Received Date',
    value: '2023-02-14'
  },
  {
    name: 'Project Cost',
    value: '$36072'
  },
  {
    name: 'Lead Source',
    value: 'Web'
  },
  {
    name: 'Latest Proposal Submission Date',
    value: '2024-11-24'
  },
  {
    name: 'Proposal Preparer',
    value: 'Alice'
  },
  {
    name: 'Proposal Reviewer Name',
    value: 'Trent'
  },
  {
    name: 'Proposal Reviewer Completion Date',
    value: '2024-04-17'
  },
  {
    name: 'Project Number',
    value: '97606'
  },
  {
    name: 'Construction End Date',
    value: '2024-06-25'
  },
  {
    name: 'Construction Start Date',
    value: '2024-12-28'
  },
  {
    name: 'GC Company Name',
    value: 'Murphy-Powell'
  },
  {
    name: 'GC Contact Name 1',
    value: 'Dr. Eric Ray'
  },
  {
    name: 'GC Contact Name 2',
    value: 'Terry Cooper'
  },
  {
    name: 'GC Phone 1',
    value: '001-216-405-1091'
  },
  {
    name: 'GC Phone 2',
    value: '798-874-6147x11109'
  },
  {
    name: 'GC City',
    value: 'West Katherineside'
  },
  {
    name: 'GC State',
    value: 'Florida'
  },
  {
    name: 'GC E-Mail',
    value: 'michael97@carlson.com'
  },
  {
    name: 'GC Zip Code',
    value: '82481'
  },
  {
    name: 'GC Contact Title 1',
    value: 'Petroleum engineer'
  },
  {
    name: 'GC Contact Title 2',
    value: 'Petroleum engineer'
  },
  {
    name: 'GC Company Website',
    value: 'https://perry-hartman.com/'
  },
  {
    name: 'GC Location Phone 1',
    value: '+1-082-998-4431'
  },
  {
    name: 'GC Location Phone 2',
    value: '(703)441-9051'
  },
  {
    name: 'Developer Company Name',
    value: 'Warren-Hernandez'
  },
  {
    name: 'Developer Contact Name 1',
    value: 'Janet Gardner'
  },
  {
    name: 'Developer Contact Name 2',
    value: 'Brittany Miller'
  },
  {
    name: 'Developer Phone 1',
    value: '001-229-084-1709x9551'
  },
  {
    name: 'Developer Phone 2',
    value: '869.214.1984x05665'
  },
  {
    name: 'Developer City',
    value: 'Melissaview'
  },
  {
    name: 'Developer State',
    value: 'Montana'
  },
  {
    name: 'Developer E-Mail',
    value: 'bryanalvarez@cardenas.com'
  },
  {
    name: 'Developer Zip Code',
    value: '79092'
  },
  {
    name: 'Developer Contact Title 1',
    value: 'Banker'
  },
  {
    name: 'Developer Contact Title 2',
    value: 'Office manager'
  },
  {
    name: 'Developer Company Website',
    value: 'http://www.stevens.info/'
  },
  {
    name: 'Developer Location Phone 1',
    value: '782-887-6691'
  },
  {
    name: 'Developer Location Phone 2',
    value: '+1-713-695-2083x260'
  },
  {
    name: 'Project Type',
    value: 'Mobile App'
  },
  {
    name: 'Project Summary',
    value: 'During produce official recently game. Lose experience class century store.\nTheir step guy analysis school foreign party. According beyond score look upon young.'
  },
  {
    name: 'Original Data Input Date',
    value: '2023-06-11'
  },
  {
    name: 'Sales Target Year -Quarter',
    value: '2025-Q2'
  },
  {
    name: 'Sales Executive Call Back Schedule (SEC)',
    value: '2025-01-08'
  },
  {
    name: 'Sales Executive Notes (SEC)',
    value: 'Water foreign west so money establish necessary. Word model light some step drop.\nToday assume prove. Yard article hear me general claim huge political. Onto military follow discover.'
  },
  {
    name: 'Sales Executive Last Note Date (SEC)',
    value: '2025-02-09'
  },
  {
    name: 'Project Description',
    value: 'Stay air what under part. No stuff focus. Traditional dark third important conference new team begin.'
  },

   {
        name: 'SSEM Communication Schedule',
        value: 'Bi-weekly'
        },
        {
        name: 'SSEM Call Importance',
        value: 'Medium'
        },

      { name: 'Deal Potential Status', value: undefined }, // Value not provided in original tableData
      { name: 'Next Step Summary', value: undefined }, // Value not provided in original tableData
      { name: 'Account Name', value: 'Alvarez-Duarte' },
      { name: 'Customer Known Company As', value: 'Inc' },
      { name: 'Customer Parent Company Name', value: 'Zimmerman-Ross' },
      { name: 'Last Email Date', value: '2023-04-21' },
      { name: 'Deal Status', value: 'Open' },
      { name: 'Account Level', value: 'Gold' },
      { name: 'Account ID', value: '1' },
      { name: "CEO's Deal Review Date", value: '2024-09-06' },
      { name: 'Last Account Review Date', value: '2023-12-26' },
      { name: 'Group Name', value: 'Group C' },
      { name: 'Sales Executive Caller (SEC)', value: 'ugallegos' },
      { name: 'Sales Executive Last Call Date (SEC)', value: '2023-06-04' },
      { name: 'Last Modified By', value: 'pkerr' },
      { name: 'Industry', value: 'Education' },
      { name: 'Created By', value: 'ryanamy' },
      { name: 'Sales Completion Target Date', value: 'Q1' },
      { name: 'Closing Date', value: 'Q3' },
      { name: 'Owner Contact Name', value: 'Brian Williamson' },
      { name: 'Owner Contact Name 2', value: 'Michelle Barton' },
      { name: 'Owner Company Name', value: 'King, Rice and Hoffman' },
      { name: 'Owner Contact Title', value: 'Systems developer' },
      { name: 'Owner Contact Title 2', value: 'Journalist, magazine' },
      { name: 'Owner Phone', value: '0054510058' },
      { name: 'Owner Phone 2', value: '001-359-452-4956' },
      { name: 'Owner Fax', value: '8032172785' },
      { name: 'Owner Website', value: 'http://www.jackson-curtis.biz/' },
      { name: 'Owner City', value: 'Julieberg' },
      { name: 'Owner E-Mail', value: 'robertellis@hotmail.com' },
      { name: 'Owner State', value: 'Texas' },
      { name: 'Owner Location Phone 1', value: '428.171.9785x1265' },
      { name: 'Owner Location Phone 2', value: '(437)328-2108' },
      { name: 'Owner Address', value: '620 Kim Alley\nRyanburgh, OK 10085' },
      { name: 'Lead Sales Executive (SEC)', value: 'John Doe' },
      { name: 'Billing City', value: 'West Mark' },
      { name: 'Billing State', value: 'Mississippi' },
      { name: 'Billing County', value: 'New Hampshire' },
      { name: 'Billing Zip Code', value: '78130' },
      { name: 'Billing Street', value: '117 Wilson Lodge Apt. 373' },
      { name: 'Billing Country', value: 'British Indian Ocean Territory (Chagos Archipelago)' },
      { name: 'Account Reviewer', value: 'fdelgado' },
      { name: 'BuildingCategory/ConstructionType', value: 'Residential' },
      { name: 'PhaseOfBusiness/ActionStageType', value: 'Planning' },
      { name: 'Lead Priority', value: 'Medium' },
      { name: 'News and Notes', value: undefined }, // Value not provided in original tableData
      { name: 'Account Potential Status', value: 'Confirmed' },
      { name: 'Sub Industry Name', value: 'Healthcare' },
      { name: 'Hoovers -Dodge Industry Name', value: 'Pharma' },
      { name: 'Dodge Industry Sub-sub-class Name', value: 'Web Dev' },
      { name: 'Payment Received Date', value: '2023-02-14' },
      { name: 'Project Cost', value: '$36072' },
      { name: 'Lead Source', value: 'Web' },
      { name: 'Latest Proposal Submission Date', value: '2024-11-24' },
      { name: 'Proposal Preparer', value: 'Alice' },
      { name: 'Proposal Reviewer Name', value: 'Trent' },
      { name: 'Proposal Reviewer Completion Date', value: '2024-04-17' },
      { name: 'Project Number', value: '97606' },
      { name: 'Construction End Date', value: '2024-06-25' },
      { name: 'Construction Start Date', value: '2024-12-28' },
      { name: 'Architect Contact Name', value: undefined }, // Value not provided in original tableData
      { name: 'Architect Contact Name 2', value: undefined }, // Value not provided in original tableData
      { name: 'Architect Company Name', value: undefined }, // Value not provided in original tableData
      { name: 'Architect Website', value: undefined }, // Value not provided in original tableData
      { name: 'Architect Address', value: undefined }, // Value not provided in original tableData
      { name: 'Architect Phone', value: undefined }, // Value not provided in original tableData
      { name: 'Architect Phone 2', value: undefined }, // Value not provided in original tableData
      { name: 'Architect Contact Title', value: undefined }, // Value not provided in original tableData
      { name: 'Architect Contact Title 2', value: undefined }, // Value not provided in original tableData
      { name: 'Architect Location Phone 1', value: undefined }, // Value not provided in original tableData
      { name: 'Architect Location Phone 1', value: undefined }, // Value not provided in original tableData
      { name: 'GC Company Name', value: 'Murphy-Powell' },
      { name: 'GC Contact Name 1', value: 'Dr. Eric Ray' },
      { name: 'GC Contact Name 2', value: 'Terry Cooper' },
      { name: 'GC Phone 1', value: '001-216-405-1091' },
      { name: 'GC Phone 2', value: '798-874-6147x11109' },
      { name: 'GC City', value: 'West Katherineside' },
      { name: 'GC State', value: 'Florida' },
      { name: 'GC E-Mail', value: 'michael97@carlson.com' },
      { name: 'GC Zip Code', value: '82481' },
      { name: 'GC Contact Title 1', value: 'Petroleum engineer' },
      { name: 'GC Contact Title 2', value: 'Petroleum engineer' },
      { name: 'GC Company Website', value: 'https://perry-hartman.com/' },
      { name: 'GC Location Phone 1', value: '+1-082-998-4431' },
      { name: 'GC Location Phone 2', value: '(703)441-9051' },
      { name: 'Developer Company Name', value: 'Warren-Hernandez' },
      { name: 'Developer Contact Name 1', value: 'Janet Gardner' },
      { name: 'Developer Contact Name 2', value: 'Brittany Miller' },
      { name: 'Developer Phone 1', value: '001-229-084-1709x9551' },
      { name: 'Developer Phone 2', value: '869.214.1984x05665' },
      { name: 'Developer City', value: 'Melissaview' },
      { name: 'Developer State', value: 'Montana' },
      { name: 'Developer E-Mail', value: 'bryanalvarez@cardenas.com' },
      { name: 'Developer Zip Code', value: '79092' },
      { name: 'Developer Contact Title 1', value: 'Banker' },
      { name: 'Developer Contact Title 2', value: 'Office manager' },
      { name: 'Developer Company Website', value: 'http://www.stevens.info/' },
      { name: 'Developer Location Phone 1', value: '782-887-6691' },
      { name: 'Developer Location Phone 2', value: '+1-713-695-2083x260' },
      { name: 'Project Type', value: 'Mobile App' },
      { name: 'Project Summary', value: 'During produce official recently game. Lose experience class century store.\nTheir step guy analysis school foreign party. According beyond score look upon young.' },
      { name: 'Original Data Input Date', value: '2023-06-11' },

      { name: 'SSEM Call Importance', value: 'Medium' },
      { name: 'Sales Target Year -Quarter', value: '2025-Q2' },
      { name: 'Sales Executive Call Back Schedule (SEC)', value: '2025-01-08' },
      { name: 'Sales Executive Notes (SEC)', value: 'Water foreign west so money establish necessary. Word model light some step drop.\nToday assume prove. Yard article hear me general claim huge political. Onto military follow discover.' },
      { name: 'Sales Executive Last Note Date (SEC)', value: '2025-02-09' },
      { name: 'Project Description', value: 'Stay air what under part. No stuff focus. Traditional dark third important conference new team begin.' },


    {
      name: 'SSEM Communication Schedule',
      value: 'Weekly'
    },
    {
      name: 'SSEM Call Importance',
      value: 'High'
    },
    { name: 'Deal Potential Status', value: undefined }, // Value not provided in original tableData
    { name: 'Next Step Summary', value: undefined }, // Value not provided in original tableData
    { name: 'Account Name', value: 'Watson, Villanueva and Travis' },
    { name: 'Customer Known Company As', value: 'Inc' },
    { name: 'Customer Parent Company Name', value: 'Mcdaniel, Fisher and Lopez' },
    { name: 'Last Email Date', value: '2025-06-15' },
    { name: 'Deal Status', value: 'In Progress' },
    { name: 'Account Level', value: 'Gold' },
    { name: 'Account ID', value: '2' },
    { name: "CEO's Deal Review Date", value: '2024-05-29' },
    { name: 'Last Account Review Date', value: '2024-08-07' },
    { name: 'Group Name', value: 'Group A' },
    { name: 'Sales Executive Caller (SEC)', value: 'christopherpacheco' },
    { name: 'Sales Executive Last Call Date (SEC)', value: '2023-07-14' },
    { name: 'Last Modified By', value: 'llopez' },
    { name: 'Industry', value: 'Tech' },
    { name: 'Created By', value: 'reneeperez' },
    { name: 'Sales Completion Target Date', value: 'Q3' },
    { name: 'Closing Date', value: 'Q2' },
    { name: 'Owner Contact Name', value: 'Selena Clark' },
    { name: 'Owner Contact Name 2', value: 'Ebony Stein' },
    { name: 'Owner Company Name', value: 'Mason LLC' },
    { name: 'Owner Contact Title', value: 'Legal secretary' },
    { name: 'Owner Contact Title 2', value: 'Animator' },
    { name: 'Owner Phone', value: '(483)774-0988x63747' },
    { name: 'Owner Phone 2', value: '001-747-191-1747x56059' },
    { name: 'Owner Fax', value: '(803)904-1831x0608' },
    { name: 'Owner Website', value: 'http://www.davis-dudley.com/' },
    { name: 'Owner City', value: 'West Erin' },
    { name: 'Owner E-Mail', value: 'fletchermicheal@padilla.com' },
    { name: 'Owner State', value: 'Alabama' },
    { name: 'Owner Location Phone 1', value: '+1-564-168-9561x59447' },
    { name: 'Owner Location Phone 2', value: '(099)055-0387' },
    { name: 'Owner Address', value: '11326 Jennifer Curve Suite 802\nNorth Edwardmouth, AZ 37132' },
    { name: 'Lead Sales Executive (SEC)', value: 'Emily Davis' },
    { name: 'Billing City', value: 'East William' },
    { name: 'Billing State', value: 'Missouri' },
    { name: 'Billing County', value: 'Minnesota' },
    { name: 'Billing Zip Code', value: '13185' },
    { name: 'Billing Street', value: '9964 Johnson Burg' },
    { name: 'Billing Country', value: 'Guernsey' },
    { name: 'Account Reviewer', value: 'amandaclark' },
    { name: 'BuildingCategory/ConstructionType', value: 'Commercial' },
    { name: 'PhaseOfBusiness/ActionStageType', value: 'Execution' },
    { name: 'Lead Priority', value: 'Medium' },
    { name: 'News and Notes', value: undefined }, // Value not provided in original tableData
    { name: 'Account Potential Status', value: 'Confirmed' },
    { name: 'Sub Industry Name', value: 'Tech' },
    { name: 'Hoovers -Dodge Industry Name', value: 'Software' },
    { name: 'Dodge Industry Sub-sub-class Name', value: 'Biotech' },
    { name: 'Payment Received Date', value: '2023-05-04' },
    { name: 'Project Cost', value: '$398757' },
    { name: 'Lead Source', value: 'Direct' },
    { name: 'Latest Proposal Submission Date', value: '2025-01-07' },
    { name: 'Proposal Preparer', value: 'Alice' },
    { name: 'Proposal Reviewer Name', value: 'Mallory' },
    { name: 'Proposal Reviewer Completion Date', value: '2023-03-04' },
    { name: 'Project Number', value: '55401' },
    { name: 'Construction End Date', value: '2023-01-03' },
    { name: 'Construction Start Date', value: '2025-05-24' },
    { name: 'Architect Contact Name', value: undefined }, // Value not provided in original tableData
    { name: 'Architect Contact Name 2', value: undefined }, // Value not provided in original tableData
    { name: 'Architect Company Name', value: undefined }, // Value not provided in original tableData
    { name: 'Architect Website', value: undefined }, // Value not provided in original tableData
    { name: 'Architect Address', value: undefined }, // Value not provided in original tableData
    { name: 'Architect Phone', value: undefined }, // Value not provided in original tableData
    { name: 'Architect Phone 2', value: undefined }, // Value not provided in original tableData
    { name: 'Architect Contact Title', value: undefined }, // Value not provided in original tableData
    { name: 'Architect Contact Title 2', value: undefined }, // Value not provided in original tableData
    { name: 'Architect Location Phone 1', value: undefined }, // Value not provided in original tableData
    { name: 'Architect Location Phone 1', value: undefined }, // Value not provided in original tableData
    { name: 'GC Company Name', value: 'Crawford-Johnson' },
    { name: 'GC Contact Name 1', value: 'Michael Gray' },
    { name: 'GC Contact Name 2', value: 'Deborah Solis' },
    { name: 'GC Phone 1', value: '516-540-7354' },
    { name: 'GC Phone 2', value: '(191)189-3350' },
    { name: 'GC City', value: 'Craigborough' },
    { name: 'GC State', value: 'Iowa' },
    { name: 'GC E-Mail', value: 'garysmith@crawford.com' },
    { name: 'GC Zip Code', value: '32567' },
    { name: 'GC Contact Title 1', value: 'Education officer, environmental' },
    { name: 'GC Contact Title 2', value: 'Programme researcher, broadcasting/film/video' },
    { name: 'GC Company Website', value: 'https://rodriguez.com/' },
    { name: 'GC Location Phone 1', value: '183-860-7799x8308' },
    { name: 'GC Location Phone 2', value: '049.118.9162x539' },
    { name: 'Developer Company Name', value: 'Barber-Graham' },
    { name: 'Developer Contact Name 1', value: 'Kathy Garcia' },
    { name: 'Developer Contact Name 2', value: 'Nicole Boyd' },
    { name: 'Developer Phone 1', value: '001-222-505-5315x405' },
    { name: 'Developer Phone 2', value: '651.995.2058x44777' },
    { name: 'Developer City', value: 'Stephentown' },
    { name: 'Developer State', value: 'Washington' },
    { name: 'Developer E-Mail', value: 'patrick54@sutton.net' },
    { name: 'Developer Zip Code', value: '18699' },
    { name: 'Developer Contact Title 1', value: 'Geophysical data processor' },
    { name: 'Developer Contact Title 2', value: 'Applications developer' },
    { name: 'Developer Company Website', value: 'http://young.com/' },
    { name: 'Developer Location Phone 1', value: '(785)150-4852x107' },
    { name: 'Developer Location Phone 2', value: '(809)357-3626' },
    { name: 'Project Type', value: 'Mobile App' },
    { name: 'Project Summary', value: 'Administration arm data low agency great cultural shoulder. Information buy seat. Identify imagine hour should clear information evening debate. Mrs now whom as.' },
    { name: 'Original Data Input Date', value: '2022-12-24' },
    { name: 'SSEM Communication Schedule', value: 'Weekly' },
    { name: 'SSEM Call Importance', value: 'High' },
    { name: 'SSEM Work Notes', value: 'Maintain do end hair nothing rule never. Represent task land past. Democratic husband standard bag.\nSuffer firm already officer court public field. Two carry will situation.' },
    { name: 'Sales Target Year -Quarter', value: '2025-Q2' },
    { name: 'Sales Executive Call Back Schedule (SEC)', value: '2023-02-02' },
    { name: 'Sales Executive Notes (SEC)', value: 'Knowledge wonder form least guess other administration anything. Card catch strategy early film. Executive every determine camera red security.' },
    { name: 'Sales Executive Last Note Date (SEC)', value: '2023-12-27' },
    { name: 'Project Description', value: 'Save forget catch clear. Perform idea left direction clearly morning somebody. Daughter character floor agreement trip.' }
  ]


  }),
 actions: {
    toggleColumnVisibility(columnName) {
      const column = this.allColumns.find(col => col.name === columnName);
      if (column) {
        column.value = !column.value;
      }
    },
    toggleColumnSelector() {
      this.showColumnSelector = !this.showColumnSelector;
    },
    getVisibleColumns() {
      return this.allColumns.filter(col => col.value);
    },
    getVisibleTableData() {
      return this.tableData.map(row => 
        row.filter(item => {
          const column = this.allColumns.find(col => col.name === item.name);
          return column ? column.value : false;
        })
      );
    }
  }
});
