import UploadHeader from "./UploadHeader";
import VideoUploader from "./VideoUploader";
import UploadFooter from "./UploadFooter";


const UploadApp = ()=>{
    return(
       <div>
             <UploadHeader/>
             <div className="page-layout">
                <VideoUploader/>
             </div>
             <UploadFooter/>
       </div>
    );
};
export default UploadApp;