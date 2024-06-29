import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import UpdateField from './UpdateField';
import { Pencil } from 'lucide-react';
import { Button } from "../ui/button";
import { Form, FormField } from "@/components/ui/form";
import { isValidPhoneNumber } from "react-phone-number-input";

const GenderArr = [
    { value: "male", desc: "Male" },
    { value: "female", desc: "Female" },
    { value: "others", desc: "Others" },
];

const FormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    gender: z.enum(["male", "female", "others"]),
    mobile: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),
    zipcode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid zipcode"),
});

const ProfilePage = () => {
    const [addressEditMode, setAddressEditMode] = useState(false);
    const [editModes, setEditModes] = useState<Record<string, boolean>>({});
    const [formChanged, setFormChanged] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: 'Ritik Singh',
            email: 'ritik224@gmail.com',
            password: 'Password1',
            gender: 'male',
            mobile: '+91 7014737289',
            city: 'Jersey City',
            state: 'New Jersey',
            country: 'United States',
            zipcode: '07307'
        },
    });

    const handleEditModeChange = (field: string, mode: boolean) => {
        setEditModes(prev => ({ ...prev, [field]: mode }));
    };

    const handleChange = () => {
        setFormChanged(true);
    };

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log("Updated Profile Object:", data);
        // Turn off all edit modes
        setEditModes({});
        setAddressEditMode(false);
        setFormChanged(false);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col w-full p-2 border border-red-600'
                onChange={handleChange}
            >
                <div className='my-2 mb-8 text-3xl'>Profile Page</div>
                <div className='flex justify-between'>
                    <div className='w-1/2 h-[300px] flex items-center justify-center'>
                        <div className='h-[300px] w-[200px] bg-cyan-300'>
                            Image
                        </div>
                    </div>
                    <div className='w-[45%] flex flex-col gap-4'>
                        {Object.keys(form.getValues()).map((field) => (
                            !['city', 'state', 'country', 'zipcode'].includes(field) && (
                                <FormField
                                    key={field}
                                    control={form.control}
                                    name={field as keyof z.infer<typeof FormSchema>}
                                    render={({ field: formField }) => (
                                        <UpdateField
                                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                                            id={field}
                                            type={field === 'password' ? 'password' : 'text'}
                                            inputType={field === 'gender' ? 'select' : field === 'mobile' ? 'phonenumber' : 'input'}
                                            arr={field === 'gender' ? GenderArr : undefined}
                                            isEditMode={editModes[field] || false}
                                            setEditMode={(mode) => handleEditModeChange(field, mode)}
                                            field={formField}
                                        />
                                    )}
                                />
                            )
                        ))}
                    </div>
                </div>

                <div className='mt-10'>
                    <div className="flex items-center justify-between">
                        <h2>Current Address</h2>
                        <Pencil 
                            size={16} 
                            onClick={() => setAddressEditMode(!addressEditMode)}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4 my-2'>
                        {['city', 'state', 'country', 'zipcode'].map((field) => (
                            <FormField
                                key={field}
                                control={form.control}
                                name={field as keyof z.infer<typeof FormSchema>}
                                render={({ field: formField }) => (
                                    <UpdateField
                                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                                        id={field}
                                        addressField={true}
                                        isEditMode={addressEditMode}
                                        setEditMode={() => {}}
                                        field={formField}
                                    />
                                )}
                            />
                        ))}
                    </div>
                </div>
                
                <Button type="submit" className="mt-4" disabled={!formChanged}>
                    Save Changes
                </Button>
            </form>
        </Form>
    );
};

export default ProfilePage;
