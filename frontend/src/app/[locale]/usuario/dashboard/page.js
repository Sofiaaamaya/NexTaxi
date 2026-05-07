import RideFormConductor from "@/components/views/conductor/RideFormConductor";
export default function Dashboard() {
  return (
    <>
      <div>
        <h1>Conductor Dashboard</h1>
        <p>Welcome to the conductor dashboard. Here you can manage your tasks and view your schedule.</p>
      </div>
      <RideFormConductor />
    </>

  );
}