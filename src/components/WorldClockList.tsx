import WorldClock from './WorldClock';

interface WorldClockListProps {
  data: Array<{ id: string; city: string; cityTime: number }>;
  onDelete: (id: string) => void;
}

function WorldClockList({ data, onDelete }: WorldClockListProps) {

    return (
        <div className="clock-list"> 
            {data.map((item)=>{
                return(
                    <WorldClock props={item} onDelete={onDelete} key={item.id} />
                )
            })}
         </div>
    );
}

export default WorldClockList;