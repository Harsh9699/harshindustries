"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  volume: string;
  status: string;
  createdAt: Timestamp;
}

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        if (!db) return;
        const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Enquiry[];
        
        setEnquiries(data);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEnquiries();
  }, []);

  return (
    <div className="space-y-xl max-w-[1152px] mx-auto">
      <header className="flex justify-between items-end border-b brutalist-border pb-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Dashboard</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Overview of recent activity and enquiries.</p>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <div className="bg-surface border brutalist-border p-lg">
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm">New Enquiries</p>
          <p className="font-display-lg text-display-lg text-primary">{enquiries.length}</p>
        </div>
        <div className="bg-surface border brutalist-border p-lg">
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm">Total Products</p>
          <p className="font-display-lg text-display-lg text-on-surface">3</p>
        </div>
        <div className="bg-surface border brutalist-border p-lg">
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm">System Status</p>
          <p className="font-display-lg text-display-lg text-secondary">Live</p>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-surface border brutalist-border">
        <div className="p-md border-b brutalist-border flex justify-between items-center bg-surface-dim">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Recent Enquiries</h2>
          <button className="font-label-caps text-label-caps text-primary hover:underline">Refresh</button>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-xl text-center text-on-surface-variant font-label-caps">Loading data...</div>
          ) : enquiries.length === 0 ? (
             <div className="p-xl text-center text-on-surface-variant font-label-caps">No enquiries found.</div>
          ) : (
            <table className="w-full text-left font-body-sm">
              <thead className="font-label-caps text-label-caps text-on-surface-variant border-b brutalist-border">
                <tr>
                  <th className="p-md font-normal">Date</th>
                  <th className="p-md font-normal">Company / Name</th>
                  <th className="p-md font-normal">Volume</th>
                  <th className="p-md font-normal">Status</th>
                  <th className="p-md font-normal text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-surface-dim transition-colors">
                    <td className="p-md text-on-surface-variant">
                      {enq.createdAt?.toDate ? enq.createdAt.toDate().toLocaleDateString() : 'Just now'}
                    </td>
                    <td className="p-md font-medium text-on-surface">{enq.name}<br/><span className="text-xs text-on-surface-variant">{enq.email}</span></td>
                    <td className="p-md text-on-surface-variant">{enq.volume}</td>
                    <td className="p-md">
                      <span className={`px-2 py-1 text-xs rounded-sm border ${enq.status === 'New' ? 'border-primary text-primary bg-primary/10' : 'border-secondary text-secondary bg-secondary/10'}`}>
                        {enq.status || 'New'}
                      </span>
                    </td>
                    <td className="p-md text-right">
                      <button className="font-label-caps text-label-caps text-primary hover:underline">Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
