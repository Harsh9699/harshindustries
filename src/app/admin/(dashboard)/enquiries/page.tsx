"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  requestType?: string;
  product?: string;
  status: string;
  createdAt: Timestamp;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        if (!db) return;
        const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
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

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      if (!db) return;
      await updateDoc(doc(db, "enquiries", id), { status: newStatus });
      setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="font-mono-data text-mono-data text-on-surface-variant animate-pulse">
          LOADING_ENQUIRIES...
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-lg border-b brutalist-border pb-sm">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Sample Requests & Orders</h1>
          <p className="font-body-md text-on-surface-variant">Manage incoming customer enquiries.</p>
        </div>
        <div className="font-mono-data text-mono-data text-on-surface-variant bg-surface-container-high px-sm py-xs border brutalist-border rounded">
          TOTAL: {enquiries.length}
        </div>
      </div>

      <div className="bg-surface border brutalist-border rounded overflow-hidden">
        <table className="w-full text-left font-body-sm">
          <thead className="bg-surface-container-low border-b brutalist-border font-label-caps text-label-caps text-on-surface-variant">
            <tr>
              <th className="p-md font-medium">Date</th>
              <th className="p-md font-medium border-l brutalist-border">Customer</th>
              <th className="p-md font-medium border-l brutalist-border">Type</th>
              <th className="p-md font-medium border-l brutalist-border">Product Requested</th>
              <th className="p-md font-medium border-l brutalist-border">Status</th>
              <th className="p-md font-medium border-l brutalist-border text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {enquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-xl text-center text-on-surface-variant font-mono-data">
                  NO_ENQUIRIES_FOUND
                </td>
              </tr>
            ) : (
              enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-md text-on-surface-variant font-mono-data text-[12px]">
                    {enq.createdAt?.toDate().toLocaleDateString() || "Unknown"}
                  </td>
                  <td className="p-md font-medium text-on-surface border-l brutalist-border">
                    <div className="flex flex-col">
                      <span>{enq.name}</span>
                      <span className="font-mono-data text-[10px] text-primary bg-primary/10 px-1 py-0.5 rounded mt-1 max-w-fit">ID: {enq.id}</span>
                    </div>
                  </td>
                  <td className="p-md text-on-surface-variant border-l brutalist-border font-medium">
                    {enq.requestType || "Sample"}
                  </td>
                  <td className="p-md text-on-surface-variant border-l brutalist-border font-medium">
                    {enq.product || "-"}
                  </td>
                  <td className="p-md border-l brutalist-border">
                    <span className={`inline-flex items-center gap-1 px-xs py-1 rounded font-mono-data text-[10px] uppercase ${
                      enq.status === 'Accepted' ? 'bg-[#c8e6c9] text-[#2e7d32]' : 
                      enq.status === 'Declined' ? 'bg-[#ffcdd2] text-[#c62828]' : 
                      'bg-secondary-container text-on-secondary-container'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        enq.status === 'Accepted' ? 'bg-[#2e7d32]' : 
                        enq.status === 'Declined' ? 'bg-[#c62828]' : 
                        'bg-primary'
                      }`}></span>
                      {enq.status}
                    </span>
                  </td>
                  <td className="p-md border-l brutalist-border text-right">
                    <button 
                      onClick={() => setSelectedEnquiry(enq)}
                      className="text-primary hover:underline font-label-caps text-label-caps text-[12px]"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-black/50 backdrop-blur-sm">
          <div className="bg-surface w-full max-w-[600px] border brutalist-border rounded-lg shadow-xl flex flex-col max-h-[90vh]">
            <div className="p-lg border-b brutalist-border flex justify-between items-center bg-surface-container-low">
              <h2 className="font-headline-md text-headline-md text-on-surface">Enquiry Details</h2>
              <button 
                onClick={() => setSelectedEnquiry(null)}
                className="text-on-surface-variant hover:text-error transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-lg overflow-y-auto flex-1 flex flex-col gap-md">
              <div className="grid grid-cols-2 gap-md">
                <div>
                  <div className="font-label-caps text-[10px] text-on-surface-variant mb-1">Customer Name</div>
                  <div className="font-body-md text-on-surface">{selectedEnquiry.name}</div>
                </div>
                <div>
                  <div className="font-label-caps text-[10px] text-on-surface-variant mb-1">Tracking ID</div>
                  <div className="font-mono-data text-primary font-medium">{selectedEnquiry.id}</div>
                </div>
                <div>
                  <div className="font-label-caps text-[10px] text-on-surface-variant mb-1">Date Received</div>
                  <div className="font-body-md text-on-surface">{selectedEnquiry.createdAt?.toDate().toLocaleString() || "Unknown"}</div>
                </div>
                <div>
                  <div className="font-label-caps text-[10px] text-on-surface-variant mb-1">Email</div>
                  <div className="font-body-md text-on-surface">{selectedEnquiry.email}</div>
                </div>
                <div>
                  <div className="font-label-caps text-[10px] text-on-surface-variant mb-1">Phone</div>
                  <div className="font-body-md text-on-surface">{selectedEnquiry.phone || "-"}</div>
                </div>
              </div>
              
              <div className="border-t border-outline-variant/30 pt-md">
                <div className="font-label-caps text-[10px] text-on-surface-variant mb-1">Delivery Address</div>
                <div className="font-body-md text-on-surface p-sm bg-surface-container-lowest border brutalist-border rounded min-h-[60px]">
                  {selectedEnquiry.address || "No address provided."}
                </div>
              </div>
              
              <div className="border-t border-outline-variant/30 pt-md grid grid-cols-2 gap-md">
                <div>
                  <div className="font-label-caps text-[10px] text-on-surface-variant mb-1">Request Type</div>
                  <div className="font-body-md text-primary font-medium">{selectedEnquiry.requestType || "Sample"}</div>
                </div>
                <div>
                  <div className="font-label-caps text-[10px] text-on-surface-variant mb-1">Product Requested</div>
                  <div className="font-body-md text-on-surface font-medium">{selectedEnquiry.product || "-"}</div>
                </div>
              </div>
            </div>

            <div className="p-md border-t brutalist-border bg-surface-container-low flex justify-end gap-sm">
              <button 
                onClick={() => updateStatus(selectedEnquiry.id, "Declined")}
                className="px-lg py-sm font-label-caps text-[12px] border brutalist-border rounded text-error hover:bg-error/10 transition-colors"
              >
                Decline
              </button>
              <button 
                onClick={() => updateStatus(selectedEnquiry.id, "Accepted")}
                className="px-lg py-sm font-label-caps text-[12px] rounded bg-primary text-on-primary hover:opacity-90 transition-opacity shadow-sm"
              >
                Accept Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
