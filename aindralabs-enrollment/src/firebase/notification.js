export default function buildFirebaseNotification(admin) {
    return async function firebaseNotification(notificationMessageTitle, notificationMessageBody, firebaseDeviceIdentifier) {
      try {
        const message = {
          data: {
            title: notificationMessageTitle,
            body: notificationMessageBody
          },
        };

        const options = {
          dryRun: false
        }
        const response = await admin.messaging().sendToDevice(firebaseDeviceIdentifier,message, options)
        if (response.results[0].error) {
          // throw new Error(response.results[0].error)
          console.log(`error while sending to ${firebaseDeviceIdentifier}`,response.results[0].error);
        }
        else {
          console.log(`Successfully sent message: to ${firebaseDeviceIdentifier}`, response.results);
        }
        return response;

      } catch (e) {
        console.log('Error sending message:', e);
        throw new Error('Error sending message:', e)
        return e;

      }

    }
}
