let currentUser: any = null;

export function setUser(user: any) {
  currentUser = user;
}

export function getUser() {
  return currentUser;
}
