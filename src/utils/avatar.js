export const resolveAvatar = (avatar, name = "User") => {
  if (!avatar) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&background=6366f1&color=fff&bold=true`;
  }

  // kalau sudah full URL
  if (avatar.startsWith("http")) {
    return avatar;
  }

  // file dari backend
  return `${import.meta.env.VITE_API_BASE_URL}/storage/avatars/${avatar}`;
};