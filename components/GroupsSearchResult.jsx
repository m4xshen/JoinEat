import Group from "./Group";

export default function GroupsSearchResult({
  setActiveEventId,
  isButtonDisable,
  groupsSearchResult,
}) {
  console.log("777");
  return (
    <div>
      {groupsSearchResult !== null &&
        groupsSearchResult?.data?.events.map((event) => (
          <Group
            key={event.event_id}
            hostId={event.host_id}
            eventName={event.name}
            shop_name={event.shop_name}
            eventTime={event.appointment_time}
            people_joined={event.people_joined}
            people_limit={event.people_limit}
            eventDistance={event.distance}
            eventId={event.event_id}
            setActiveEventId={setActiveEventId}
            isButtonDisable={isButtonDisable}
          />
        ))}
    </div>
  );
}
