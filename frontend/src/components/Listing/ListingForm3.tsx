
const ListingForm3 = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
            <div>
                Additional Details
            </div>
           <div className='w-full'>
                <Form {...listingForm2}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-2">

                        

                        
                        {/* <ListingFormButton /> */}

                    </form>
                </Form>

           </div>
        </div>
  )
}

export default ListingForm3