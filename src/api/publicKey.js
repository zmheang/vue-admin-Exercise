import request from "@/utils/request";

export function getPublicKey(data) {
  console.log('publicKey.js---data:::')
  console.log(data)
  return request({
    url: "/publicKey",
    method: "post",
  });
}
