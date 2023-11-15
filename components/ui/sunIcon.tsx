import Image from "next/image";
import sun from "../../public/sun.svg"


const SunIcon = () => {
    return (
        <div>
            <Image src={sun} alt={'sun-icon'} width={30} height={30}/>
        </div>
    );
};

export default SunIcon;