import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import UpdateField from './UpdateField';
import { Pencil, User } from 'lucide-react';
import { Button } from "../ui/button";
import { Form, FormField } from "@/components/ui/form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useSelector, useDispatch } from 'react-redux';
import { getUser, setUser } from '@/appstore/userSlice';
import { useMutation } from '@apollo/client';
import { EDIT_PROFILE_QUERY } from '@/graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { initCityAutocomplete } from '@/lib/cityAutocomplete';

const GenderArr = [
    { value: "male", desc: "Male" },
    { value: "female", desc: "Female" },
    { value: "others", desc: "Others" },
];

const FormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().optional(),
    gender: z.enum(["male", "female", "others"]),
    phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),
    zipcode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid zipcode"),
});

const ProfilePage = () => {
    const [editProfile, {loading}] = useMutation(EDIT_PROFILE_QUERY);
    const [addressEditMode, setAddressEditMode] = useState(false);
    const [editModes, setEditModes] = useState<Record<string, boolean>>({});
    const [formChanged, setFormChanged] = useState(false);

    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            password: user?.password || '',
            gender: user?.gender || 'male',
            phone: user?.phone || '',
            city: user?.address?.city || '',
            state: user?.address?.state || '',
            country: user?.address?.country || '',
            zipcode: user?.address?.zipcode || ''
        },
    });


    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name,
                email: user.email,
                password: user.password,
                gender: user.gender,
                phone: user.phone,
                city: user.address?.city,
                state: user.address?.state,
                country: user.address?.country,
                zipcode: user.address?.zipcode,
            });
        }
    }, [user, form]);

    useEffect(() => {
        const loadAutocomplete = () => {
            if (window.google && window.google.maps && addressEditMode) {
                initCityAutocomplete(form.setValue, "city");
            }
        };

        // Call loadAutocomplete when addressEditMode changes
        loadAutocomplete();

        // Clean up the autocomplete when addressEditMode is turned off
        return () => {
            if (window.google && window.google.maps && !addressEditMode) {
                const cityInput = document.getElementById("city") as HTMLInputElement;
                if (cityInput) {
                    google.maps.event.clearInstanceListeners(cityInput);
                }
            }
        };
    }, [form.setValue, addressEditMode]);

    const handleEditModeChange = (field: string, mode: boolean) => {
        setEditModes(prev => ({ ...prev, [field]: mode }));
    };

    const handleChange = () => {
        setFormChanged(true);
    };

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const { city, state, country, zipcode, ...restData } = data;
        
        const userProfileData = {
            id: user?.id,
            ...restData,
            address: {
                city,
                state,
                country,
                zipcode,
            },
        };
        
        try {
            const { data : responseData} = await editProfile({
                variables : {
                    editUserProfileData: userProfileData
                }
            })

            dispatch(setUser(responseData.editProfile));
            navigate('/browse')
            setEditModes({});
            setAddressEditMode(false);
            setFormChanged(false);
            toast({
                title: "Profile Updated",
                description: "Your profile has been successfully updated.",
                duration: 1000,
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            toast({
                title: "Update Failed",
                description: "There was an error updating your profile. Please try again.",
                duration: 1000,
            });
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <p className="text-lg text-gray-600 dark:text-gray-300">Loading user data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-violet-800 dark:text-violet-200 mb-8">Profile Page</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} onChange={handleChange} className="space-y-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-1/3 flex flex-col items-center">
                                <div className="w-48 h-48 bg-violet-200 dark:bg-violet-700 rounded-full flex items-center justify-center mb-4">
                                    {user?.profileImage ? (
                                        <img src={user?.profileImage} alt={user?.name} className="w-48 h-48 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-48 h-48 bg-violet-200 dark:bg-violet-700 rounded-full flex items-center justify-center">
                                            <User size={64} className="text-violet-600 dark:text-violet-300" />
                                        </div>
                                    )}
                                </div>
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
                                                    inputType={field === 'gender' ? 'select' : field === 'phone' ? 'phonenumber' : 'input'}
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

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
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
                                                enableAutocomplete={field === 'city' && addressEditMode}
                                            />
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={!formChanged || loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ProfilePage;