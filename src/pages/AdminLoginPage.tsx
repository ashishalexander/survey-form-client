// AdminLoginPage.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { LockIcon, UserIcon, ArrowRightIcon } from "lucide-react";
import { loginSchema, LoginSchemaType } from "../schemas/adminloginSchema";
import { Separator } from "@/components/ui/separator";
import { adminAuthService } from "@/services/adminAuthService";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuthentication = async () => {
      try {
        const isAuthenticated = await adminAuthService.checkAuth();
        // Only navigate if the component is still mounted
        if (isMounted && isAuthenticated) {
          navigate("/admin/dashboard");
        }
      } catch (error) {
        // Authentication failed, stay on login page
        console.error("Auth check error:", error);
      } finally {
        // Only update state if component is still mounted
        if (isMounted) {
          setCheckingAuth(false);
        }
      }
    };

    checkAuthentication();

    // Cleanup function to prevent state updates after unmounting
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setIsLoading(true);
    try {
      await adminAuthService.login(data.email, data.password);
      toast.success("Login successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center text-gray-500 dark:text-gray-400">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />
        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin@example.com"
                        type="email"
                        className="w-full focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center">
                      <LockIcon className="mr-2 h-4 w-4" />
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        className="w-full focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 font-medium py-2 mt-4 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
                {!isLoading && <ArrowRightIcon className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-200 dark:border-gray-800 pt-4 text-sm text-gray-500 dark:text-gray-400">
          System administrator access only
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLoginPage;