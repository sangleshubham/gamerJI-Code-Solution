import openpgp from "openpgp";

let armoredPrivateKey, armoredPublicKey;
export async function generateKeyPair(data) {
  let { privateKey, publicKey } = await openpgp.generateKey({
    curve: "ed25519",
    userIDs: [
      {
        name: "Shubham Sangle",
        email: "sangleshubham9@gmail.com",
        comment: "This key is for public sharing",
      },
    ],
    passphrase: "secret",
  });

  armoredPrivateKey = privateKey;
  armoredPublicKey = publicKey;
}

export async function encryptValue(req, res) {
  const publicKey = await openpgp.readKey({ armoredKey: armoredPublicKey });
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: req.body.value }), // input as Message object
    encryptionKeys: publicKey,
  });
  res.status(200).send(encrypted);
}

export async function decryptValue(req, res) {
  const message = await openpgp.readMessage({
    armoredMessage: req.body.encrypted, // parse armored message
  });

  let privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: armoredPrivateKey }),
    passphrase: "secret",
  });

  const { data: decrypted, signatures } = await openpgp.decrypt({
    message,
    decryptionKeys: privateKey,
  });

  res.status(200).send(decrypted);
}
