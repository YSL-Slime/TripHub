const handleSave = async (setStateFunc, fieldName, stateValueToUpdate) => {
  try {
    setStateFunc(false);
    const updatedUserData = { [fieldName]: stateValueToUpdate };

    const response = await fetch("/api/update-user-data", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user._id, // Assuming you have _id in the user session
        updatedUserData,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Handle successful update
    } else {
      // Handle error
    }
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};
