## Function Name: ReapitDataTransfer

Summary: This JavaScript function performs data transfer and mapping operations for Reapit, involving various data sources and transformations.

Documentation:

1. The function begins by logging a message to indicate the start of the Reapit data transfer process.

2. It uses asynchronous programming with `await` to fetch data from multiple sources simultaneously. These sources include `fetchReapitData`, `fetchDealsFromHubspot`, `fetchOwnersFromHubspot`, `negotiatorsData`, `fetchAllSources`, and `fetchAllAreas`. These functions presumably retrieve data from Reapit and HubSpot.

3. The data fetched from these sources is destructured into variables for further processing. The variables include `reapit`, `deals`, `owners`, `negotiators`, `sources`, and `areas`.

4. Maps are created for `areas`, `owners`, `sources`, and `negotiators` to efficiently look up data during processing.

5. A loop iterates through the `reapit_data` array which is a list of Reapit applicants. It creates a mapping of applicant data by ID.

6. The function then filters the `deals` array, likely to select specific deals based on certain criteria. The filtered deals are stored in `testFilterDeals`. (currently taking only those deals which does not contain aplicant id and priceTo and priceFrom fields have a value for testing)---- can manipulate according to you

7. Another array, `testData`, is created by slicing a portion of the `deals` array (specifically, from index 300 to 349). This may be for testing purposes. --- can adjust it acording to your purpose

8. The function initializes a counter variable, `count`, which will be used to track the progress of processing the `testData` array.

9. Inside the loop, the function processes each deal in `testData`:

   a. It logs the processing status of the deal, including the deal ID and count.

   b. It calls the `reapitObj` function, to transform the deal data into a Reapit-compatible format. The result is stored in `r_obj`.

   c. It determines the `negotiatorID` based on the `hubspot_owner_id` from the deal and the `ownersMap`. If a matching owner is found, their negotiator ID is used; otherwise, it defaults to "ROP."

   d. It prepares an `areaInfoToFill` object to store location-related information.

   e. If the deal has a `community` property, it splits the communities and associates them with area options.

   f. If the deal has a `sub_community` property, it splits the sub-communities and associates them with area options.

   g. It prepares a `source` object to store source-related information.

   h. If the `deal_source` property is defined in the deal, it attempts to retrieve the source ID from `sourcesMap`. If not found, it creates a new source in Reapit.

   i. Contact details are fetched based on associations with the deal. If no associations are found, a new contact is created in Reapit with relevant information.

   j. The function determines which contacts to associate with the deal based on email and mobile phone number matching. Contacts are associated with Reapit contacts if a match is found, or a new contact is created.

   k. If a matching Reapit contact is found, it is added to the `finalContactsToAssociate` array.

   l. If a matching Reapit contact is not found, a new contact is created in Reapit, and its details are fetched. If successful, the contact is added to the `finalContactsToAssociate` array.

   m. If the deal has a corresponding Reapit object (`reapit_obj`) and the Reapit object has been modified more recently than the HubSpot deal, it is added to the `transferToReapit` array.

   n. If there is no corresponding Reapit object, a new Reapit object (`r_obj`) is prepared with various properties, including status, negotiator, location, and source.

   o. If the deal's `dealstage` matches a specific value, the `statusId` is set accordingly. Otherwise, it is determined based on the `qualfication_status`.

   p. The function adds the `r_obj` to the `newReapitData` array if it meets certain conditions, such as having contact details and a valid buying field.

   q. The `count` is incremented to track progress through the loop.

10. Finally, the function returns an object containing three arrays: `transferToReapit`, `newReapitData`, and `updateReapitData`. These arrays likely contain data objects ready for transfer or update in the Reapit system.

---

Function Name: HubspotDataTransfer

Summary: This JavaScript function handles the data transfer from Reapit to HubSpot. It processes Reapit applicant data, creates HubSpot deals, associates contacts, and sets deal properties based on Reapit data.

Documentation:

1. The function starts by logging a message to indicate the beginning of the HubSpot data transfer process.

2. It takes a single parameter, `WEBHOOK_BODY`, which contains data from a webhook triggered by Reapit.

3. The function extracts the `REAPIT_APPLICANT` object from `WEBHOOK_BODY` and logs its content. This object is newly created/modified Reapit applicant.

4. Inside a conditional statement, the function checks if the `age` property of `REAPIT_APPLICANT` includes the string "new." (offplan applicant)

5. If the condition is met, the function proceeds to fetch additional data from HubSpot, including deals, owners, and negotiators, using asynchronous `Promise.all` calls.

6. Maps are created for `owners` and `negotiators` to efficiently look up data during processing.

7. Inside a conditional block, the function checks if the webhook topic ID is "applicants.created," indicating the creation of a new Reapit applicant (`REAPIT_APPLICANT`).

8. The function then checks if a matching deal for the Reapit applicant already exists in HubSpot. It does this by iterating through the fetched `deals` array and comparing the `applicant_id` of each deal with the `id` of the Reapit applicant. If a match is found, it logs a message indicating that the deal already exists and exits the loop.

9. If no matching deal is found, the function proceeds to create a new HubSpot deal based on the Reapit applicant data. It calls the `hubspotDealsObj` function, prepare the deal object.

10. The function retrieves role information for the contacts associated with the Reapit applicant (`REAPIT_APPLICANT.related`) and collects their client types.

11. The owner ID for the deal is determined based on the `negotiatorIds` of the Reapit applicant and the `negotiatorsMap`. If a matching owner is found, their ID is used; otherwise, it defaults to a predefined ID.

12. If the Reapit applicant's `locationType` is "areas" and there are location options, the function processes and associates them with the deal properties.

13. The function sets the HubSpot deal properties, including `dealstage`, `qualfication_status`, `future_prospecting_date`, and `client_type`, based on Reapit data and other calculations.

14. If the Reapit applicant has a `source` property, the function attempts to retrieve the source name from Reapit and assigns it to the HubSpot deal.

15. The HubSpot deal is created using the `createNewDeal` function, and the resulting deal object is logged.

16. The function prepares to create associations between the newly created HubSpot deal and contacts associated with the Reapit applicant. It iterates through the contacts and, for each contact:

a. It fetches role information for the contact and determines the contact's owner based on `negotiatorsMap`.

b. If the contact's email matches a known email format, it checks for a matching HubSpot contact. If found, it associates the HubSpot contact with the new deal.

c. If no matching HubSpot contact is found, a new contact is created in HubSpot with relevant information, and an association is established between the contact and the new deal.

17. The function completes the data transfer process for the Reapit applicant.

Similar type of flow is there for applicants.modified part also

---

Function Name: reapitContactToHubpotViaWebhooks

Summary: This asynchronous function handles the creation and updating of contacts in HubSpot via webhook events triggered by Reapit.

Documentation:

### Function: reapitContactToHubpotViaWebhooks(WEBHOOK_BODY)

This function is responsible for processing webhook events triggered by Reapit when contacts are created or modified. It updates or creates corresponding contacts in HubSpot based on the data received in the webhook payload.

#### Input Parameters:

- `WEBHOOK_BODY`: The webhook payload received from Reapit, containing information about the contact changes.

#### Workflow:

1. The function begins by logging a message indicating that the contact creation or updating process in HubSpot via webhooks has started.

2. It extracts the Reapit contact data from the `WEBHOOK_BODY` object.

3. It fetches additional data needed for mapping and processing, including sources and owners, from HubSpot.

4. Maps the fetched owner and source data into respective dictionaries (`ownersMap` and `sourcesMap`) for easy lookup.

5. It checks whether the webhook event corresponds to a contact creation (`contacts.created`) or contact modification (`contacts.modified`) event, and if there's valid Reapit contact data.

6. For a `contacts.created` event, the script checks whether a matching contact already exists in HubSpot. It checks for a matching email address or mobile phone number. If a match is found, it logs that the contact is already present in HubSpot. If no match is found, it proceeds to create a new contact in HubSpot.

7. When creating a new contact in HubSpot, the script constructs the contact schema (`schema`) based on the Reapit contact data. It handles aspects such as client types, owner IDs, and contact sources.

8. It also handles the scenario where the Reapit contact does not have an email but has a mobile phone number. In such cases, it generates a random email address for the contact.

9. The script performs data cleaning by removing properties with `undefined` or `null` values from the `schema` object.

10. After constructing the `schema`, it creates the new contact in HubSpot using the `createNewContact` function and logs a message indicating that the contact has been created successfully.

11. For a `contacts.modified` event, the script checks whether a matching contact exists in HubSpot based on the Reapit contact's ID. If a match is found, it proceeds to update the existing contact in HubSpot.

12. Similar to the creation process, the script constructs the contact schema (`schema`) for updating the contact. It updates client types, owner IDs, and contact sources based on the Reapit data.

13. It also handles the scenario where the Reapit contact does not have an email but has a mobile phone number by generating a random email address.

14. The script then checks if the `schema` object contains any properties with `undefined` or `null` values and removes them.

15. After constructing the `schema` for updating, it updates the contact in HubSpot using the `updateContactInHubspot` function and logs a message indicating that the contact has been successfully updated.

16. If no match is found for the Reapit contact in HubSpot for the `contacts.modified` event, it logs that no match was found.

17. If the webhook event does not correspond to either `contacts.created` or `contacts.modified`, the script logs that the topic ID fetched is invalid.

18. The script includes error handling to log any encountered errors and returns an error message if an error occurs during execution.

#### Output:

- If a contact is created or updated successfully, the function returns a success message indicating the action taken.

- If the contact is already present in HubSpot (in the case of `contacts.created`), it returns a message indicating that the contact is already present.

- If no match is found for the Reapit contact in HubSpot (in the case of `contacts.modified`), it logs that no match was found but does not return any specific message.

- If the webhook event topic ID is invalid, it logs that the topic ID is invalid and does not return a specific message.

- In case of an error during execution, the function logs the error and returns an error message.

---

Function Name: journalToNote

Summary: This asynchronous function is responsible for converting applicant journals into notes in HubSpot, based on specific criteria and conditions.

Documentation:

### Function: journalToNote()

This function is used to process applicant journals and create corresponding notes in HubSpot. It operates asynchronously to handle potentially large amounts of data efficiently.

#### Workflow:

1. The function starts by logging a message indicating the initialization of the "Applicant Journal 2 Notes" function.

2. It fetches data related to owners, negotiators, and deals from HubSpot using asynchronous functions (`fetchOwnersFromHubspot`, `negotiatorsData`, and `fetchDealsFromHubspot`).

3. It creates two mapping objects (`negotiatorsMap` and `ownersMap`) based on the fetched data to associate negotiator and owner email addresses with their respective IDs for easy reference.

4. The function sets the batch size (`batchSize`) for processing deals and identifies the total number of deals to be processed.

5. It initializes a count variable to keep track of processed deals.

6. The function processes deals in batches to efficiently handle a large number of records. It iterates through batches of deals using a loop.

7. For each batch, it retrieves the relevant deals and creates an empty array to store notes that will be created in HubSpot.

8. For each deal in the batch, it checks if the deal has an associated applicant ID (`applicant_id`).

9. If an applicant ID is found, the function proceeds to fetch applicant journals for the given applicant using the `fetchApplicantJournal` function.

10. If journals are retrieved, the function fetches existing notes associated with the deal using the `fetchNotesForDeal` function.

11. It then iterates through the journals and processes each journal entry.

12. For each journal entry, it checks if a note with the same content already exists for the deal in HubSpot. If an identical note is found or if specific conditions related to journal content are met, the function continues to the next journal entry.

13. If a new note needs to be created, it determines the owner ID for the note based on the negotiator associated with the journal entry. If a negotiator's email is available, it maps it to an owner ID using the `negotiatorsMap` and `ownersMap`. If not, it assigns a default owner ID.

14. The function prepares properties for the new note, including the timestamp, note body, and owner ID.

15. It constructs the `noteBody` object, which includes the note properties and the association of the note with the deal in HubSpot.

16. The `noteBody` is added to the batch of notes to be created.

17. Once all eligible journals in the batch have been processed, the function creates the notes in HubSpot in a batch using the `createBatchNote` function.

18. The function updates the progress count and logs a message indicating the number of deals processed out of the total.

19. This process continues until all deals have been processed.

20. Finally, the function logs a message indicating the completion of the "Applicant Journal 2 Notes" function and returns a success code (1) if successful. If any errors occur during execution, it logs the error and returns the error message.

#### Output:

- If the function runs successfully, it returns a success code (1) and logs the completion message.

- In case of an error during execution, the function logs the error and returns the error message.

---

Function Name: dealActivityToJournal

Summary: This asynchronous function is responsible for transferring deal activities to applicant journals based on specific conditions and criteria.

Documentation:

### Function: dealActivityToJournal()

This function handles the process of transferring deal activities to applicant journals in HubSpot. It operates asynchronously to efficiently process a potentially large number of deals activities.

#### Workflow:

1. The function starts by logging a message indicating the initialization of the "Moving Deals Activity to Journal" function.

2. It fetches data related to deals, negotiators, and owners from HubSpot using asynchronous functions (`fetchDealsFromHubspot`, `negotiatorsData`, and `fetchOwnersFromHubspot`).

3. Two mapping objects, `negotiatorsMap` and `ownersMap`, are created based on the fetched data to associate negotiator email addresses with negotiator data and owner IDs with owner email addresses, respectively.

4. The function selects a subset of deals for processing, specified by the `testData` variable. This can be adjusted as needed.

5. The function iterates through the selected deals.

6. For each deal, it retrieves the deal's stage history.

7. If the deal does not have an associated applicant ID (`applicant_id`), it logs a message indicating that the applicant was not found and continues to the next deal.

8. If an applicant ID is found, the function fetches applicant journals for the applicant using the `fetchApplicantJournal` function.

9. It then processes the deal's stage history to transfer deal activity to journals. For each stage change in the history, it generates a description based on the stage change details, including the user responsible for the change.

10. It checks if a journal entry with the same description already exists for the applicant. If it does, the function continues to the next stage change. If not, it creates a new journal entry with the description.

11. The function then fetches tasks, calls, notes, emails, and meetings associated with the deal using asynchronous functions (`fetchTasksforDeal`, `fetchCallsforDeal`, `fetchNotesForDeal`, `fetchEmailsforDeal`, `fetchMeetingsforDeal`).

12. For each type of activity (tasks, calls, notes, emails, and meetings), the function transfers the activity to journals by generating a description based on the activity details and user responsible for the activity.

13. Similar to the previous step, it checks if a journal entry with the same description already exists for the applicant. If it does, the function continues to the next activity. If not, it creates a new journal entry with the description.

14. The function logs progress messages for each activity type and deal.

15. Once all deal activities have been transferred to journals for a deal, it logs a message indicating the successful completion of the deal's activity transfer.

16. The function continues to the next deal and repeats the process.

17. After processing all deals, the function logs a message indicating the completion of the "Moving Deals Activity to Journal" function and returns a success code (1) if successful. In case of errors during execution, it logs the error message and returns the error.

#### Output:

- If the function runs successfully, it returns a success code (1) and logs the completion message.

- In case of an error during execution, the function logs the error and returns the error message.

Note for Venky: Currently Webhooks are live on the azure app service, for other function (Reapit DataTransfer, journalToNote, dealActivitiesTojournals) You can either comment out the starter function and all by doing the chnges in azure app service ssh only or you can run those functions locally as per your convenience and on the limited deals/applicants as per the requirements. You can run activites sync functions locally by creating different instances 2-3 parallely to make the sync work properly. In azure app service for full journalsSync and activities sync, it will be riskier to run those on cron because they are now exceeding the time limit of 1 hr and can create problems.
