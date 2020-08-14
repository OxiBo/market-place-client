// https://dev.to/ogwurujohnson/cloudinary-image-upload-the-setup-k3h  , https://blog.logrocket.com/handling-images-with-cloudinary-in-react/
const uploadFile = async (e, setFieldValue) => {
  //   console.log(e)
  // https://www.pluralsight.com/guides/how-to-create-a-simple-form-submit-with-files  , https://developer.mozilla.org/en-US/docs/Web/API/FileList ,   https://javascript.info/formdata
  const files = e.target.files;
  // console.log(e)
  const data = new FormData();

  data.append("file", files[0]);
  data.append("upload_preset", "sickfits");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/di0hg10hd/image/upload",
    {
      method: "POST",
      body: data,
    }
  );
  const file = await res.json();

  // https://hackernoon.com/formik-handling-files-and-recaptcha-209cbeae10bc
  setFieldValue("image", file.secure_url);
  // setFieldValue("largeImage", file.eager[0].secure_url);
};

export default uploadFile


