export default function Progress({ params, state }) {

    return (
        
        /*
            Should reflect progress by submodules. 
            Each module should show their submodules slightly closer,
            and the current submodule could be highlighted by a border-accent
            or maybe be bg-accent-light
        */

        <div className="flex gap-4">
            {state.map((item, index) => ( // change key = index to property from deck
                <div key={index} className={`w-full flex justify-between rounded-full ${item === 1 ? 'bg-accent' : 'bg-background-accent-soft'}  w-[50px] h-[8px]`} />
            ))}
        </div>
    )
}