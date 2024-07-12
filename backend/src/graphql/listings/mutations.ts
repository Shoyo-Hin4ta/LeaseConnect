export const mutations = `#graphql
    createListing(listingDetails: ListingFormInput!, listingImages : [Upload]!) : NewListingResponse!

    editListing(listingID: ID!,createdBy:ID!, listingDetails: EditListingFormInput, imagesURL: [String!], newImages: [Upload!]) : EditListingFormResponse
`