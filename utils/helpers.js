export const MOBILEFLASHCARD_STORAGE_KEY = "Udacity:MobileFlashCards"
export const NOTIFICATION_KEY = "MobileFlashCards:Notifications";



export const generateUniId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}



