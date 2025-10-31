import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import { 
  Building2, 
  Users, 
  Calendar, 
  Truck, 
  Sparkles, 
  Camera,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  ArrowLeft
} from 'lucide-react';

export default function CorporatePage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('home');

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    numberOfPeople: '',
    eventType: '',
    eventDate: '',
    additionalServices: [] as string[],
    message: ''
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setLocation('/');
    } else if (tab === 'orders') {
      setLocation('/orders');
    } else if (tab === 'profile') {
      setLocation('/profile');
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.eventType) {
      toast({
        title: "Missing Information",
        description: "Please select an event type.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.eventDate) {
      toast({
        title: "Missing Information",
        description: "Please select an event date.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Quote Request Submitted",
      description: "Our team will contact you within 24 hours with a customized quote.",
    });
    
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      numberOfPeople: '',
      eventType: '',
      eventDate: '',
      additionalServices: [],
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader 
        onCartClick={() => setLocation('/cart')}
        cartItemCount={0}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4 -ml-2"
          onClick={() => setLocation('/')}
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-serif" data-testid="text-corporate-title">
                Corporate Catering
              </h1>
              <p className="text-muted-foreground" data-testid="text-corporate-subtitle">
                Elevate your workplace experience with authentic Indian cuisine
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <Card className="hover-elevate" data-testid="card-bulk-orders">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Bulk Order Discounts</CardTitle>
              <CardDescription>
                Special pricing for large orders. The more you order, the more you save.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover-elevate" data-testid="card-scheduled-delivery">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Scheduled Delivery</CardTitle>
              <CardDescription>
                Plan your meals in advance with our flexible scheduling options.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover-elevate" data-testid="card-dedicated-support">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Priority Service</CardTitle>
              <CardDescription>
                Dedicated account manager and priority delivery for your orders.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover-elevate" data-testid="card-event-decor">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Event Decoration</CardTitle>
              <CardDescription>
                Beautiful, professional decor to make your events memorable.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover-elevate" data-testid="card-photography">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Photography Services</CardTitle>
              <CardDescription>
                Professional photography to capture your special moments.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover-elevate" data-testid="card-custom-menu">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Customized Menus</CardTitle>
              <CardDescription>
                Tailored menu options to match your event requirements and budget.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quote Request Form */}
        <Card className="mb-8" data-testid="card-quote-form">
          <CardHeader>
            <CardTitle className="text-2xl">Request a Quote</CardTitle>
            <CardDescription>
              Fill out the form below and our team will get back to you within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    data-testid="input-company-name"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Your company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    data-testid="input-contact-person"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    data-testid="input-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    data-testid="input-phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numberOfPeople">Number of People *</Label>
                  <Input
                    id="numberOfPeople"
                    type="number"
                    data-testid="input-number-of-people"
                    required
                    min="10"
                    value={formData.numberOfPeople}
                    onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                    placeholder="Minimum 10 people"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type *</Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                  >
                    <SelectTrigger id="eventType" data-testid="select-event-type">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office-lunch">Office Lunch</SelectItem>
                      <SelectItem value="team-meeting">Team Meeting</SelectItem>
                      <SelectItem value="corporate-event">Corporate Event</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="training">Training Session</SelectItem>
                      <SelectItem value="celebration">Office Celebration</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  data-testid="input-event-date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-3">
                <Label>Additional Services (Optional)</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant={formData.additionalServices.includes('decor') ? 'default' : 'outline'}
                    className="justify-start"
                    onClick={() => handleServiceToggle('decor')}
                    data-testid="button-service-decor"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Event Decor
                  </Button>
                  <Button
                    type="button"
                    variant={formData.additionalServices.includes('photography') ? 'default' : 'outline'}
                    className="justify-start"
                    onClick={() => handleServiceToggle('photography')}
                    data-testid="button-service-photography"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Photography
                  </Button>
                  <Button
                    type="button"
                    variant={formData.additionalServices.includes('custom-menu') ? 'default' : 'outline'}
                    className="justify-start"
                    onClick={() => handleServiceToggle('custom-menu')}
                    data-testid="button-service-custom-menu"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Custom Menu
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Requirements</Label>
                <Textarea
                  id="message"
                  data-testid="textarea-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your specific requirements, dietary restrictions, budget expectations, etc."
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                data-testid="button-submit-quote"
              >
                Request Quote
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card data-testid="card-contact-info">
          <CardHeader>
            <CardTitle>Need Immediate Assistance?</CardTitle>
            <CardDescription>Our corporate catering team is here to help</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">+91 80 1234 5678</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">corporate@feastexpress.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Business Hours</p>
                <p className="text-sm text-muted-foreground">Monday - Saturday: 9:00 AM - 8:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted-foreground">Bangalore, Karnataka</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        cartItemCount={0}
      />
    </div>
  );
}
