import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '../ui/form';
import InputBox from '../InputBox';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setUser } from '@/appstore/userSlice';
import { LOGIN_MUTATION } from '@/lib/queries';
import { AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
});

type LoginInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const form = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [logIn, { loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginInputs) => {
    try {
      const { data: responseData } = await logIn({
        variables: {
          input: data
        }
      });

      // console.log("Response:", responseData);
      // console.log("to browse");

      dispatch(setUser(responseData.login));
      navigate('/');

    } catch (error) {
      console.log("Error during login:", error.message);
      // We don't need to set the error state here as it's handled by Apollo Client
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-violet-800 dark:text-violet-200 mb-6">
          Login to Your Account
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputBox
              name="email"
              label="Email"
              formControl={form.control}
              placeholder="Enter your email"
              type="email"
              className="w-full"
              labelClassName="text-violet-700 dark:text-violet-300"
              inputClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
            />
            <InputBox
              name="password"
              label="Password"
              formControl={form.control}
              placeholder="Enter your password"
              type="password"
              className="w-full"
              labelClassName="text-violet-700 dark:text-violet-300"
              inputClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
            />

          {error && (
                    <div className="mb-4 my-2-2 p-2 border-l-4 border-red-500 bg-red-100 dark:bg-red-900 dark:bg-opacity-20 text-red-700 dark:text-red-200 rounded-r">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <p>{error.message}</p>
                      </div>
                    </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-600"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>

        
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;