import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Container from "../Container/container"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useEffect } from "react";
import { initAutocomplete } from "@/lib/googlemaps.ts"


interface Form3Types{
    currentStep? : number,
    isCompleted? : boolean
}

const addressFormSchema = z.object({
  // address : z.string({
  //   required_error : "Please fill the address"
  // }),
  city : z.string({
    required_error : "Please fill the city"
  }),
  state : z.string({
    required_error : "Please fill the state"
  }),
  country: z.string({
    required_error : "Please fill the country"
  }),
  postcode : z.string({
    required_error : "Please fill the zipcode"
  })
})

const RegisterForm3 = ({currentStep, isCompleted} : Form3Types) => {

  useEffect((()=> {   
    initAutocomplete();
  }), [])

  const addressForm = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      city: "",
      state:"",
      country: "",
      postcode: "",
    },
  })

  function onSubmit(data: z.infer<typeof addressFormSchema>) {
    console.log(data)
  }

  return (
    <Container>
        <div>RegisterForm3</div>
        <Form {...addressForm}>
        <form onSubmit={addressForm.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={addressForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter City" id="city" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={addressForm.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="Enter State" id="state" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={addressForm.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Country" id="country" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={addressForm.control}
            name="postcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZipCode</FormLabel>
                <FormControl>
                  <Input placeholder="Enter PostCode" id="postcode" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
    </Container>
    
  )
}

export default RegisterForm3