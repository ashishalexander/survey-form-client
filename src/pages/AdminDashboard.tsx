// AdminDashboard.tsx - Enhanced version with flexible pagination
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { LogOut, RefreshCw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { adminAuthService } from "@/services/adminAuthService";
import { surveyService } from "@/services/dashboardService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Survey {
  _id: string;
  name: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  message: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isPageInputVisible, setIsPageInputVisible] = useState(false);
  const [pageInputValue, setPageInputValue] = useState("");

  useEffect(() => {
    fetchSurveys();
  }, [currentPage, itemsPerPage, searchTerm]);

  const fetchSurveys = async () => {
    setIsLoading(true);
    try {
      const response = await surveyService.getSurveys(currentPage, itemsPerPage, searchTerm);
      
      if (response.success) {
        setSurveys(response.surveys);
        setTotalPages(Math.ceil(response.total / itemsPerPage));
        setTotalSubmissions(response.total);
      } else {
        toast.error("Failed to load survey data");
      }
    } catch (error) {
      console.error("Error fetching surveys:", error);
      toast.error("Failed to load survey data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminAuthService.logout();
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out");
    }
  };

  const handleRefresh = () => {
    fetchSurveys();
    toast.info("Data refreshed");
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (value: string) => {
    const newLimit = parseInt(value);
    setItemsPerPage(newLimit);
    setCurrentPage(1); 
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); 
    fetchSurveys();
  };

  const handleRowClick = (survey: Survey) => {
    setSelectedSurvey(survey);
  };

  const handleDirectPageInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newPage = parseInt(pageInputValue);
      if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        setIsPageInputVisible(false);
        setPageInputValue("");
      } else {
        toast.error(`Please enter a valid page number between 1 and ${totalPages}`);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await adminAuthService.checkAuth();
      } catch (error) {
        console.error("Auth check error:", error);
        toast.error("Session expired. Please login again.");
        navigate("/admin/login");
      }
    };
    
    checkAuth();
  }, [navigate]);

  const renderPaginationItems = () => {
    const paginationItems = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    if (startPage > 1) {
      paginationItems.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      );
      
      if (startPage > 2) {
        paginationItems.push(
          <PaginationItem key="ellipsis1" className="flex items-center px-2">
            <span 
              className="cursor-pointer" 
              onClick={() => setIsPageInputVisible(!isPageInputVisible)}
              title="Click to enter page number"
            >...</span>
          </PaginationItem>
        );
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Last page button (if not ending at max)
    if (endPage < totalPages) {
      // Ellipsis if there's a gap
      if (endPage < totalPages - 1) {
        paginationItems.push(
          <PaginationItem key="ellipsis2" className="flex items-center px-2">
            <span 
              className="cursor-pointer" 
              onClick={() => setIsPageInputVisible(!isPageInputVisible)}
              title="Click to enter page number"
            >...</span>
          </PaginationItem>
        );
      }
      
      paginationItems.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return paginationItems;
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalSubmissions}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Current Page</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{currentPage} of {totalPages}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="flex items-center gap-2" 
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-md border border-zinc-200 mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <CardTitle>Survey Submissions</CardTitle>
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search by name or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-xs"
                />
                <Button type="submit" variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : surveys.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Nationality</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Submitted On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {surveys.map((survey) => (
                      <TableRow 
                        key={survey._id}
                        className="cursor-pointer hover:bg-zinc-100"
                        onClick={() => handleRowClick(survey)}
                      >
                        <TableCell className="font-medium">{survey.name}</TableCell>
                        <TableCell>{survey.email}</TableCell>
                        <TableCell>{survey.nationality}</TableCell>
                        <TableCell>{survey.phone}</TableCell>
                        <TableCell>{formatDate(survey.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No survey submissions found</p>
              </div>
            )}

            {/* Enhanced pagination controls */}
            {totalPages > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Items per page:</span>
                  <Select 
                    value={itemsPerPage.toString()} 
                    onValueChange={handlePerPageChange}
                  >
                    <SelectTrigger className="w-16 h-9">
                      <SelectValue placeholder={itemsPerPage.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <span className="text-sm text-gray-500 ml-4">
                    Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalSubmissions)} to {Math.min(currentPage * itemsPerPage, totalSubmissions)} of {totalSubmissions}
                  </span>
                </div>
                
                <div className="flex items-center">
                  {isPageInputVisible && (
                    <div className="mr-2 flex items-center">
                      <span className="text-sm mr-2">Go to:</span>
                      <Input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={pageInputValue}
                        onChange={(e) => setPageInputValue(e.target.value)}
                        onKeyDown={handleDirectPageInput}
                        className="w-16 h-8 text-center"
                        autoFocus
                      />
                    </div>
                  )}
                  
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(currentPage - 1)}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {renderPaginationItems()}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(currentPage + 1)}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {selectedSurvey && (
          <Card className="shadow-md border border-zinc-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Survey Details</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedSurvey(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p>{selectedSurvey.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <Badge variant="outline" className="capitalize">
                        {selectedSurvey.gender}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nationality</p>
                      <p>{selectedSurvey.nationality}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{selectedSurvey.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p>{selectedSurvey.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Address</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Street Address</p>
                      <p>{selectedSurvey.streetAddress}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">City</p>
                        <p>{selectedSurvey.city}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">State</p>
                        <p>{selectedSurvey.state}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pincode</p>
                        <p>{selectedSurvey.pincode}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6 mb-4">Message</h3>
                  <div className="bg-zinc-50 p-4 rounded-md border border-zinc-200">
                    <p className="whitespace-pre-wrap">{selectedSurvey.message}</p>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-sm text-gray-500">Submission Date</p>
                    <p>{formatDate(selectedSurvey.createdAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;