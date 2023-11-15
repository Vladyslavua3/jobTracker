import Image from "next/image";
import moon from "../../public/moon.svg"

const MoonIcon = () => {
    return (
        <div>
            <Image src={moon} alt={'moon-icon'} width={30} height={30}/>
        </div>
    );
};

export default MoonIcon;