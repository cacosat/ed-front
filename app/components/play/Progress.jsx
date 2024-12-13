export default function Progress({ params, state }) {

    return (
        <div className="flex gap-4">
            {state.map((item) => (
                <div className={`rounded-full ${item === 1 ? 'bg-accent' : 'bg-background-accent-soft'}  w-[50px] h-[8px]`} />
            ))}
        </div>
    )
}