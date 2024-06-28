import React from 'react'
import UpdateField from './UpdateField'

const GenderArr = [
    {value : "male", desc : "Male"},
    {value : "female", desc : "Female"},
    {value : "others", desc : "Others"},
] 

const ProfilePage = () => {
  return (
    <div className='flex flex-col w-full p-2 border border-red-600'>
        <div className='my-2 mb-8 text-3xl'>Profile Page</div>
        <div className='flex justify-between'>
            <div className='w-1/2 h-[300px] flex items-center justify-center'>
                <div className='h-[300px] w-[200px] bg-cyan-300'>
                    Image
                </div>
            </div>
            <div className='w-[45%] flex flex-col gap-4'>

                <UpdateField
                label='Name'
                id='name' 
                value='Ritik Singh'
                />

                <UpdateField
                label='Email'
                id='email' 
                value='ritik224@gmail.com'
                type='email'/>

                <UpdateField
                label='Password'
                id='password' 
                value='Password1'
                type='password'/>


                <UpdateField
                label='Gender'
                id='gender'
                value="male"
                inputType='select'
                arr={GenderArr}
                />

                <UpdateField
                label='Mobile'
                id='mobilenumber'
                value='+91 7014737289'
                inputType='phonenumber'
                />

            </div>
            
               
        </div>

        <div className='mt-10'>
            <div className='text-base'>
                Current Address
            </div>
            <div className='grid grid-cols-2 gap-4 my-2'>
                <div>
                    <UpdateField
                    label='City'
                    id='city' 
                    value='Jersey City'
                    />
                </div>
                <div>
                    <UpdateField
                    label='State'
                    id='state' 
                    value='New Jersey'
                    />
                </div>
                <div>
                    <UpdateField
                    label='Country'
                    id='country' 
                    value='United States'
                    />
                </div>
                <div>
                    <UpdateField
                    label='ZipCode'
                    id='zipcode' 
                    value='07307'
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage