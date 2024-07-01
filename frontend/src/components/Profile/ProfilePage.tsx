import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import UpdateField from './UpdateField';
import { Pencil, User } from 'lucide-react';
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-violet-800 dark:text-violet-200 mb-8">Profile Page</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} onChange={handleChange} className="space-y-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-1/3 flex flex-col items-center">
                                <div className="w-48 h-48 bg-violet-200 dark:bg-violet-700 rounded-full flex items-center justify-center mb-4">
                                    <User size={64} className="text-violet-600 dark:text-violet-300" />
                                </div>
                                <Button type="button" variant="outline" className="w-full dark:text-white">Change Photo</Button>
                            </div>
                            <div className="w-full md:w-2/3 space-y-6">
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

                        <div className=" bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-violet-700 dark:text-violet-300">Current Address</h2>
                                <Button variant="ghost" size="sm" type="button" onClick={() => setAddressEditMode(!addressEditMode)}>
                                    <Pencil size={16} className="mr-2" />
                                    {addressEditMode ? 'Cancel' : 'Edit'}
                                </Button>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
                        
                        <Button type="submit" className="w-full" disabled={!formChanged}>
                            Save Changes
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ProfilePage;
