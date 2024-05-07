class DataTransfer {
    constructor() {
      this.transferToReapit = [];
      this.newReapitData = [];
      this.updateReapitData = [];
    }
  
    async process() {
      console.log('Reapit data transfer function started....');
      const [
        reapit,
        deals,
        owners,
        negotiators,
        sources,
        areas
      ] = await Promise.all([
        fetchReapitData(),
        fetchDealsFromHubspot(),
        fetchOwnersFromHubspot(),
        negotiatorsData(),
        fetchAllSources(),
        fetchAllAreas()
      ]);
      
      // ... Rest of your code ...
  
      // Loop through your data and process it
      for (var data of testData) {
        // ... Your existing code ...
  
        // Update this.transferToReapit, this.newReapitData, and this.updateReapitData accordingly
        // For example, use this.transferToReapit.push() to add data to the transferToReapit array.
  
        // ... Your existing code ...
      }
    }
  
    getTransferResults() {
      return {
        transferToReapit: this.transferToReapit,
        newReapitData: this.newReapitData,
        updateReapitData: this.updateReapitData
      };
    }
  }

  async function ReapitDataTransfer() {

    console.log('Reapit data transfer function started....');

    const [
        reapit,
        deals,
        owners,
        // reapit_contacts, 
        negotiators,
        sources,
        areas
    ] = await Promise.all([
        fetchReapitData(),
        fetchDealsFromHubspot(),
        fetchOwnersFromHubspot(),
        // Contacts.find().then((contacts) => (contacts.length === 0 ? contactsData() : contacts)),
        negotiatorsData(),
        fetchAllSources(),
        fetchAllAreas()
    ]);
    var reapit_data = reapit.reapitApplicants
    var transferToReapit = [];
    var newReapitData = [];
    var updateReapitData = [];

    var areasMap = {}
    for (var area of areas) {
        areasMap[area.name] = area.id;
    }

    var ownersMap = {};
    for (var owner of owners) {
        ownersMap[owner.id] = owner.email
    }

    var sourcesMap = {};
    for (var source of sources) {
        sourcesMap[source.name] = source.id;
    }

    var negotiatorsMap = {}
    for (var negotiator of negotiators) {
        negotiatorsMap[negotiator.email] = negotiator.id
    }

    console.log('Entering to mapping loop...');
    // const testDeal = [await fetchDealById("9028265409")]
    // console.log(testDeal)
    // const tempData = deals.slice(2822,2823)

    var applicantsMap = {}
    for (var applicant of reapit_data) {
        applicantsMap[applicant.data.id] = applicant.data;
    }

    const testFilterDeals = deals.filter((deal) => {
        return deal.properties.price_to && deal.properties.price_from && !deal.properties.applicant_id
    });

    console.log(testFilterDeals.length)
    // return

    var testData = deals.slice(5200);
    // var testData = testFilterDeals.slice(250);
    // console.log(testData)
    // return
    var count = 1
    const invalidDump = fs.createWriteStream('invalidObjects.json', { flags: 'a' })
    for (var data of testData) {
        console.log(`Processing deal: ${data.id} || count: ${count}`);
        var r_obj = reapitObj(data);

        var reapit_obj = applicantsMap[data.properties.applicant_id];

        // console.log(`Deal Owner ID : ${data.properties.hubspot_owner_id}`);
        var negotiatorID = ""
        if (data.properties.hubspot_owner_id) {
            var dealOwnerDetail = ownersMap[data.properties.hubspot_owner_id]
            // console.log(`Fetch Deal Owner By Id function called: ${dealOwnerDetail}`);

            var negData = negotiatorsMap[dealOwnerDetail];

            if (negData) {
                negotiatorID = negData
            } else {
                negotiatorID = "ROP";
            }
        } else {
            negotiatorID = "ROP"
        }

        var areaInfoToFill = {
            locationType: "",
            locationOptions: []
        };

        if (data.properties.community) {
            var communities = data.properties.community.split(";");
            for (var comm of communities) {

                var community = areasMap[comm];

                if (community) {
                    areaInfoToFill.locationType = "areas";
                    areaInfoToFill.locationOptions.push(community)
                } else {
                    // create new area (community then associate...will return id.
                    const newArea = await createNewArea({
                        name: comm,
                        type: "group",
                        area: ["ABC"],
                        parentIds: null
                    });

                    if (typeof (newArea) == "string") {

                        areaInfoToFill.locationType = "areas";
                        areaInfoToFill.locationOptions.push(newArea);
                    } else {
                        console.log("Error in creating new area")
                    }

                }
            }
        }
        if (data.properties.sub_community) {

            var sub_communities = data.properties.sub_community.split(";");
            for (var sub_comm of sub_communities) {
                var subCommunity = areasMap[sub_comm];


                if (subCommunity) {
                    areaInfoToFill.locationType = "areas";
                    areaInfoToFill.locationOptions.push(subCommunity);
                } else {
                    const newArea = await createNewArea({
                        name: sub_comm,
                        type: "group",
                        area: ["ABC"],
                        parentIds: []
                    });

                    areaInfoToFill.locationType = "areas";
                    areaInfoToFill.locationOptions.push(newArea);
                }
            }
        }

        var source = {
            id: "",
            type: "source"
        }

        if (!(data.properties.deal_source == undefined || data.properties.deal_source == null || data.properties.deal_source == "")) {
            var sourceData = sourcesMap[data.properties.deal_source];

            if (sourceData) {
                source.id = sourceData
            } else {
                // create new source in reapit and then take that id.
                var sourceSchema = {
                    name: data.properties.deal_source,
                    type: "source",
                    officeIds: null,
                    departmentIds: null
                }

                var newSource = await createNewSource(sourceSchema);
                source.id = newSource
            }
        }

        var contactDetails = [];

        if (data.associations && data.associations.contacts) {
            // extract contact details from that contact
            for (var acontact of data.associations.contacts.results) {
                // console.log(acontact)              
                const details = await fetchContactById(acontact.id);
                contactDetails.push(details);
            }
        } else {
            if (data.properties?.email || data.properties?.first_name || data.properties?.last_name) {
                const newContactSchema = {
                    properties: {
                        email: data.properties?.email,
                        firstname: data.properties?.first_name,
                        lastname: data.properties?.last_name,
                        pipeline: "default"
                    }
                }
                Object.keys(newContactSchema.properties).forEach(key => {
                    if (newContactSchema.properties[key] === undefined || newContactSchema.properties[key] === null) {
                        delete newContactSchema.properties[key];
                    }
                });

                if (newContactSchema.properties.email && newContactSchema.properties.lastname) {

                    const createNew = await createNewContact(newContactSchema);

                    // creating association between that contact and deal
                    const newAssociation = await createAssociation(data.id, createNew?.id === undefined ? createNew : createNew?.id)

                    contactDetails.push(createNew)
                }

            }
        }

        var finalContactsToAssociate = []

        for (var singleContact of contactDetails) {
            var flag = true;
            var filterType = {
                mobile: true,
                email: true
            }

            if (!singleContact.properties?.email && !singleContact.properties?.mobilephone) {
                flag = false
            }

            if (!singleContact.properties?.email) {
                filterType.email = false
            }

            if (!singleContact.properties?.mobilephone) {
                filterType.mobile = false
            }

            var matchQuery = {}

            if (filterType.email == true && filterType.mobile == false) {
                matchQuery = {
                    "data.email": singleContact.properties.email
                }
            }

            if (filterType.mobile == true && filterType.email == false) {
                matchQuery = {
                    "data.mobilePhone": singleContact.properties.mobilephone
                }
            }
            if (filterType.email == true && filterType.mobile == true) {
                matchQuery = {
                    $or: [
                        { "data.email": singleContact.properties.email },
                        { "data.mobilePhone": singleContact.properties.mobilephone }
                    ]
                }
            }

            // console.log(matchQuery)

            if (flag) {

                var reap_contact = null

                const reapit_contacts = await Contacts.find(matchQuery);
                console.log("matched contacts", reapit_contacts.length);
                // return
                if (reapit_contacts.length === 1) reap_contact = reapit_contacts[0]
                else if (reapit_contacts.length > 1) {

                    var nameFilter = reapit_contacts.filter(contact => {
                        const dataForename = contact.data?.forename;
                        const dataSurname = contact.data?.surname;
                        const propertiesFirstname = singleContact.properties?.firstname;
                        const propertiesLastname = singleContact.properties?.lastname;

                        return (
                            (dataForename === propertiesFirstname || (!dataForename && !propertiesFirstname)) &&
                            (dataSurname === propertiesLastname || (!dataSurname && !propertiesLastname))
                        );
                    });
                    // console.log(nameFilter.length, "namefilter")
                    if (nameFilter.length === 1) reap_contact = nameFilter[0]
                    else if (nameFilter.length > 1) {

                        var activeContact = nameFilter.filter(cont => cont.data.active)
                        // console.log(activeContact.length, "active")
                        if (activeContact.length === 1) reap_contact = activeContact[0]
                        else if (activeContact.length > 1) {
                            var mostRecentData = activeContact.reduce((prev, current) => {
                                return (prev.data.modified > current.data.modified) ? prev : current;
                            })
                            // console.log(mostRecentData.data.id, "found")
                            reap_contact = mostRecentData
                        } else {
                            var modifiedFilter = reapit_contacts.reduce((prev, current) => {
                                return (prev.data.modified > current.data.modified) ? prev : current;
                            })

                            reap_contact = modifiedFilter
                        }
                    }
                }
                // console.log(reap_contact)
                // return
                if (reap_contact) {
                    finalContactsToAssociate.push({
                        associatedId: reap_contact.data.id,
                        associatedType: "contact"
                    });

                } else {
                    var contactSchema = reapitContactObj(singleContact)

                    var contactOwnerID = ""
                    if (singleContact.properties.hubspot_owner_id) {
                        var dealOwnerDetail = ownersMap[singleContact.properties.hubspot_owner_id]
                        // console.log(`Fetch Deal Owner By Id function called: ${dealOwnerDetail}`);

                        var negData = negotiatorsMap[dealOwnerDetail];

                        if (negData) {
                            contactOwnerID = negData
                        } else {
                            contactOwnerID = "ROP";
                        }
                    } else {
                        contactOwnerID = "ROP"
                    }

                    var contactSource = {
                        id: "",
                        type: "source"
                    }

                    if (!(singleContact.properties.contact_source == undefined || singleContact.properties.contact_source == null || singleContact.properties.contact_source == "")) {
                        var sourceData = sourcesMap[singleContact.properties.contact_source];

                        if (sourceData) {
                            contactSource.id = sourceData
                        } else {
                            // create new source in reapit and then take that id.
                            var sourceSchema = {
                                name: singleContact.properties.deal_source,
                                type: "source",
                                officeIds: null,
                                departmentIds: null
                            }



                            var newSource = await createNewSource(sourceSchema);
                            contactSource.id = newSource
                        }
                    }

                    if (contactSource.id) {
                        contactSchema.source = contactSource;
                    }
                    contactSchema.negotiatorIds.push(contactOwnerID)

                    Object.keys(contactSchema).forEach(key => {
                        if (contactSchema[key] === undefined || contactSchema[key] === null) {
                            delete contactSchema[key];
                        }
                    });


                    if (contactSchema.surname) {
                        // console.log(contactSchema)

                        const createNewContact = await createNewContactInReapit(contactSchema)
                        sleep(10000);

                        const reapitDetails = await getContactById(createNewContact.location);

                        if (reapitDetails.id) {
                            await Contacts.create({ data: reapitDetails });
                            finalContactsToAssociate.push({ "associatedId": reapitDetails.id, "associatedType": "contact" });
                        }

                    } else {
                        console.log("missing mandatory field for creating contact in reapit.")
                    }
                }
            } else {
                console.log("Associated contact does not contain both email and mobile phone number")
            }

        }

        if (reapit_obj) {

            if (reapit_obj.modified > data.properties.hs_lastmodifieddate) {
                transferToReapit.push(reapit_obj);
            } else {

                var updatedJsonSchema = {
                    active: data.properties.active ? data.properties.active : undefined,
                    negotiatorIds: [],
                    //specialFeatures: data.properties?.amenities?.split(";"),
                    bedroomsMin: data.properties?.min_bedrooms > 0 ? data.properties?.min_bedrooms : null,
                    bedroomsMax: data.properties?.max_bedrooms > 0 ? data.properties?.max_bedrooms : null,
                    bathroomsMin: data.properties?.min_bathrooms > 0 ? data.properties?.min_bathrooms : null,
                    bathroomsMax: data.properties?.max_bathrooms > 0 ? data.properties?.max_bathrooms : null,
                    source: source.id ? source : null,
                    nextCall: data.properties?.future_prospecting_date && new Date(data.properties.future_prospecting_date) > new Date() ? data.properties.future_prospecting_date : null,
                    locationType: areaInfoToFill.locationType ? areaInfoToFill.locationType : "none",
                    locationOptions: areaInfoToFill.locationOptions,
                    buying: data.properties.price_from && data.properties.price_to && data.properties.price_to > data.properties.price_from ? { priceTo: data.properties.price_to, priceFrom: data.properties.price_from } : null,
                    metadata: {
                        alternateEmail: data.properties?.alternate_email,
                        amount: data.properties?.amount,
                        city: data.properties.city,
                        closeDate: data.properties.closedate,
                        community: data.properties.community,
                        country: data.properties.country,
                        dealCategory: data.properties.deal_category,
                        dealSource: data.properties.deal_source,
                        description: data.properties.description,
                        developer: data.properties.developer,
                        hsAnalyticsLatestSource: data.properties.hs_analytics_latest_source,
                        hsAnalyticsSource: data.properties.hs_analytics_source,
                        nationality: data.properties.nationality,
                        pipeline: data.properties.pipeline,
                        projectName: data.properties.project_name,
                        propertyType: data.properties.property_type,
                        subCommunity: data.properties.sub_community,
                        typeOfDeal: data.properties.type_of_deal,
                        unitType: data.properties.unit_type,
                        views: data.properties.views,
                        hsObjectId: data.properties.hs_object_id,
                        projectName: data.properties.project_name,
                        reasonForLooking: data.properties.reason_for_looking,
                        futureProspectingTimeframe: data.properties.future_prospecting_timeframe
                    }
                }

                if (!(data.properties.hubspot_owner_id === "707859911")) {
                    updatedJsonSchema.negotiatorIds.push(negotiatorID)
                }

                if (data.properties.dealstage == "134449902") {
                    updatedJsonSchema.statusId = "UQ";
                } else {
                    if (data.properties.qualfication_status == "Hot") updatedJsonSchema.statusId = "HO"
                    else if (data.properties.qualfication_status == "Warm") updatedJsonSchema.statusId = "GE"
                    else if (data.properties.qualfication_status == "Cold") updatedJsonSchema.statusId = "CO"
                }

                Object.keys(updatedJsonSchema).forEach(key => {
                    if (updatedJsonSchema[key] === undefined || updatedJsonSchema[key] === null || updatedJsonSchema[key].length === 0) {
                        delete updatedJsonSchema[key];
                    }
                });

                updateReapitData.push({
                    id: reapit_obj.id,
                    eTag: reapit_obj._eTag,
                    data: updatedJsonSchema
                });
            }
        } else {
            r_obj.locationType = areaInfoToFill.locationType ? areaInfoToFill.locationType : "none";
            r_obj.locationOptions = areaInfoToFill.locationOptions;
            r_obj.source = source.id ? source : null;


            if (data.properties.dealstage == "134449902") {
                r_obj.statusId = "UQ";
            } else {
                if (data.properties.qualfication_status == "Warm") r_obj.statusId = "GE"
                else if (data.properties.qualfication_status == "Hot") r_obj.statusId = "HO"
                else if (data.properties.qualfication_status == "Cold") r_obj.statusId = "CO"
            }

            r_obj.negotiatorIds.push(negotiatorID)

            r_obj.related = finalContactsToAssociate

            Object.keys(r_obj).forEach(key => {
                if (r_obj[key] === undefined || r_obj[key] === null) {
                    delete r_obj[key];
                }
            });

            if (contactDetails.length != 0 && r_obj.buying && r_obj.related.length > 0) {
                newReapitData.push(r_obj);
            } else {

                var logEntry = {
                    data: r_obj
                }
                invalidDump.write(JSON.stringify(logEntry, null, 2) + '\n')

                console.log(`Either buying field is missing or related array is empty|| contactDetails: ${contactDetails.length} || buying field: ${r_obj?.buying} || related: ${r_obj.related.length}`)
            }
        }
        count++
    }
    return {
        transferToReapit: transferToReapit,
        newReapitData: newReapitData,
        updateReapitData: updateReapitData
    }
}
  
  const dataTransfer = new DataTransfer();
  dataTransfer.process();
  
  // To access the results:
  const results = dataTransfer.getTransferResults();
  