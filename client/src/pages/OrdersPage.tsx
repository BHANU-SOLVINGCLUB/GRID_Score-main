import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import AppHeader from "@/components/AppHeader";
import EmptyState from "@/components/EmptyState";
import { Clock, ShoppingBag, ArrowLeft } from "lucide-react";
import { useState } from "react";

import dishImage from '@assets/stock_images/indian_food_platter__b34d03e7.jpg';

// todo: remove mock functionality
const MOCK_ORDERS = [
  {
    id: 'ORD001',
    date: 'Today, 12:30 PM',
    items: ['Masala Dosa x2', 'Filter Coffee x1'],
    total: 200,
    status: 'delivered' as const,
  },
  {
    id: 'ORD002',
    date: 'Yesterday, 7:45 PM',
    items: ['Hyderabadi Biryani x1', 'Raita x1'],
    total: 220,
    status: 'delivered' as const,
  },
];

const STATUS_VARIANTS = {
  preparing: { variant: 'secondary' as const, label: 'Preparing' },
  delivering: { variant: 'default' as const, label: 'Out for Delivery' },
  delivered: { variant: 'outline' as const, label: 'Delivered' },
};

export default function OrdersPage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('orders');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setLocation('/');
    } else if (tab === 'categories') {
      setLocation('/categories/tiffins');
    } else if (tab === 'cart') {
      console.log('Cart clicked');
    } else if (tab === 'profile') {
      setLocation('/profile');
    }
  };

  if (MOCK_ORDERS.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-6">
        <AppHeader 
          cartItemCount={0}
          onCartClick={() => console.log('Cart clicked')}
        />
        <EmptyState 
          icon={ShoppingBag}
          title="No orders yet"
          description="Start ordering delicious food and your order history will appear here"
          actionLabel="Browse Menu"
          onAction={() => setLocation('/')}
        />
        <BottomNav 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          cartItemCount={0}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      <AppHeader 
        cartItemCount={2}
        onCartClick={() => console.log('Cart clicked')}
      />

      <main className="max-w-4xl mx-auto px-4 py-6">
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

        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-2" data-testid="text-page-title">
            Your Orders
          </h2>
          <p className="text-muted-foreground" data-testid="text-page-subtitle">
            Track and reorder from your past orders
          </p>
        </div>

        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => {
            const statusConfig = STATUS_VARIANTS[order.status];
            
            return (
              <Card key={order.id} className="p-4" data-testid={`card-order-${order.id}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold" data-testid="text-order-id">#{order.id}</h3>
                      <Badge variant={statusConfig.variant} data-testid="badge-order-status">
                        {statusConfig.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span data-testid="text-order-date">{order.date}</span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-primary font-serif flex-shrink-0" data-testid="text-order-total">
                    ₹{order.total}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-muted-foreground line-clamp-1" data-testid="text-order-items">
                    {order.items.join(', ')}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setLocation(`/orders/${order.id}`)}
                    data-testid="button-view-details"
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => console.log('Reorder', order.id)}
                    data-testid="button-reorder"
                  >
                    Reorder
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      <BottomNav 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        cartItemCount={2}
      />
    </div>
  );
}
