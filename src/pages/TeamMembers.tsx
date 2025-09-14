import {AppLayout} from '../components/layout/AppLayout';

export default function TeamMembers() {
  return (
    <AppLayout>
      <div className="p-6 md:p-10 w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Team Members</h1>
        <p className="text-muted-foreground mb-8">Manage your team and invite new members.</p>
        {/* Add team member list, invite actions, etc. here following your design language */}
        <div className="bg-card rounded-lg shadow p-6 flex flex-col gap-4">
          <span className="text-lg font-semibold">No team members yet.</span>
          <button className="btn btn-primary w-fit">Invite Member</button>
        </div>
      </div>
    </AppLayout>
  );
}
