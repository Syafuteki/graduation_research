// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Data {
    struct FogNode {
        //証明書
        string certification;
        //公開鍵
        string publicKey;
    }
    struct IoT {
        //証明書
        string certification;
        //公開鍵
        string publicKey;
    }
    struct AdminFogNode {
        //Ethereumアドレス
        address ead;
        //ユニークID
        string uid;
    }
    struct AdminIoT {
        //ユニークID
        string uid;
    }
    struct Pair {
        //ユニークID EAD同様42桁の英数字
        string fognodeUid;
        //ユニークID EAD同様42桁の英数字
        string iotUid;
    }
    struct EncryptedUid {
        //秘密鍵によって暗号化されたUID
        string uid;
    }

    //関数外に宣言しているのでブロックチェーンに書き込まれる storage扱い
    FogNode[] fognode;
    IoT[] iot;
    AdminFogNode[] adminfognode;
    AdminIoT[] adminiot;
    Pair[] pair;
    EncryptedUid[] encryptedUid;

    function setFogNode(string memory _certification, string memory _publicKey)
        public
    {
        fognode.push(FogNode(_certification, _publicKey));
    }

    function setIot(string memory _certification, string memory _publicKey)
        public
    {
        iot.push(IoT(_certification, _publicKey));
    }

    function setAdminFogNode(address _ead, string memory _uid) public {
        adminfognode.push(AdminFogNode(_ead, _uid));
    }

    function setAdminIoT(string memory _uid) public {
        adminiot.push(AdminIoT(_uid));
    }

    function isIotUid(string memory _uid) public view returns (bool) {
        bool boolean;
        for (uint256 i = 0; i < iot.length; i++) {
            boolean =
                keccak256(abi.encode(_uid)) ==
                keccak256(abi.encode(adminiot[i].uid));
            if (boolean) return true;
        }
        return false;
    }

    function setPair(string memory _fognodeUid, string memory _iotUid) public {
        pair.push(Pair(_fognodeUid, _iotUid));
    }

    function getFogNodeOfCerPub(uint256 _number)
        public
        view
        returns (string memory, string memory)
    {
        return (fognode[_number].certification, fognode[_number].publicKey);
    }

    function getIotOfCerPub(uint256 _number)
        public
        view
        returns (string memory, string memory)
    {
        return (iot[_number].certification, iot[_number].publicKey);
    }

    function setEncryptedUid(string memory _uid) public {
        encryptedUid.push(EncryptedUid(_uid));
    }

    function getEncryptedUid(uint256 _number)
        public
        view
        returns (string memory)
    {
        return encryptedUid[_number].uid;
    }
}
