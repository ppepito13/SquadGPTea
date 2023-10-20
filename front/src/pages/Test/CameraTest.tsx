import React, { useState } from 'react';
import { uploadFile } from '../../redux/ApiSice';
import store from '../../redux/store';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Button } from 'react-onsenui';

const CameraTest = () =>{
  const [img, setImg] = useState("");
  const dispatch = store.dispatch;


  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    setImg(imageUrl!);
    let blob = await fetch(image.webPath!).then(r => r.blob());
    var file = new File([blob], "name");
    dispatch(uploadFile("test1", file))
  };

  return (
    <section>
      <h1>Camera Test</h1>
      <Button modifier="fund" onClick={()=>takePicture()}>CAMERA</Button>
      {img && <img src={img} width="200" alt="img"/>}
    </section>
  );
}

export default CameraTest;
