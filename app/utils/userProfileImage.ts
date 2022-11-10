export const userProfileImage = (profileImage: any) => {
  if (profileImage) {
    return profileImage;
  } else {
    return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  }
};
