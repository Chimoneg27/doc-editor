/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import GoogleDrivePicker from "google-drive-picker";

const GooglePicker = () => {
    const [authTocken, setauthTocken] = useState("");
    const [openPicker, authRes] = GoogleDrivePicker();
  
    const handlePickerOpen = () => {
      openPicker({
        clientId: "370707894264-jppbk4jsfmrebop4b8lh9u65d99mp7m9.apps.googleusercontent.com",
        developerKey: "AIzaSyDtGLa_Fl22WQ6hZ4BgJqVKHfIGmFT1qvs",
        viewId: "DOCS",
        token: authTocken,
        showUploadView: true,
        showUploadFolders: true,
        supportDrives: true,
        multiselect: false,
        callbackFunction: (data) => {
          if (data.action === "cancel") {
            console.log("User clicked cancel/close button");
          } else if (data.docs && data.docs.length > 0) {
            console.log(data);
          }
        }
      });
    };
  
    useEffect(() => {
      if (authRes) {
        setauthTocken(authRes.access_token);
      }
    }, [authRes]);
  
    return (
      <div className="App">
        <div>
          <button onClick={handlePickerOpen}>Open Google Drive Picker</button>
        </div>
      </div>
    );
};

export default GooglePicker;