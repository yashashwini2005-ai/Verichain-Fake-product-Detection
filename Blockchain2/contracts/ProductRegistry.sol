// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProductRegistry {

    struct Product {
        string serial;
        string name;
        string manufacturer;
        string batch;
        bool exists;
    }

    mapping(string => Product) private products;

    function registerProduct(
        string memory _serial,
        string memory _name,
        string memory _manufacturer,
        string memory _batch
    ) public {

        require(!products[_serial].exists, "Product already exists");

        products[_serial] = Product(
            _serial,
            _name,
            _manufacturer,
            _batch,
            true
        );
    }

    function verifyProduct(
        string memory _serial
    ) public view returns(bool) {

        return products[_serial].exists;
    }

    function getProduct(
        string memory _serial
    )
        public
        view
        returns(
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(products[_serial].exists, "Product not found");

        Product memory p = products[_serial];

        return (
            p.serial,
            p.name,
            p.manufacturer,
            p.batch
        );
    }
}