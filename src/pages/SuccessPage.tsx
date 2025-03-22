// SuccessPage.tsx - Success confirmation page after form submission
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 p-4">
      <Card className="w-full max-w-2xl shadow-md border border-zinc-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Left panel */}
          <div className="bg-black text-white p-8 lg:col-span-1">
            
          </div>

          {/* Right panel for success message */}
          <div className="p-8 lg:col-span-4">
            <CardContent className="p-0 flex flex-col items-center justify-center text-center">
              <div className="flex flex-col items-center justify-center mb-8">
                <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
                <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
                  Submission Successful!
                </h2>
                <p className="text-zinc-600 max-w-md mb-6">
                  Thank you for completing our survey. Your response has been 
                  successfully submitted and will help us improve our services.
                </p>
                <div className="w-24 h-1 bg-green-500 rounded-full mb-6"></div>
                <p className="text-zinc-500 text-sm mb-8">
                  Reference ID: {generateReferenceId()}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleGoBack}
                  className="bg-black hover:bg-zinc-800 text-white font-medium py-2 px-6 rounded-md transition-all duration-200"
                >
                  Submit Another Response
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Helper function to generate a random reference ID
const generateReferenceId = () => {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `SRV-${timestamp}-${random}`;
};

export default SuccessPage;