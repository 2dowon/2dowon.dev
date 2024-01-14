import { Link } from "gatsby";
import * as React from "react";
import { FaTags } from "react-icons/fa";

const Header = () => {
  return (
    <header className="mt-0 flex w-full items-center justify-between border-b-[1px] border-gray-2 px-[1rem] pc:px-[5rem]">
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          width="15rem"
          height="5rem"
          viewBox="0 0 492 185"
          enable-background="new 0 0 492 185"
        >
          <image
            id="image0"
            width="492"
            height="185"
            x="0"
            y="0"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAewAAAC5CAYAAADqHgyQAAABYmlDQ1BpY2MAACiRdZC9S8NQFMVP q1LQOogOHRwyiUPU0gp2cWgrFEUwVAWrU5p+CW18JClScRNXKfgfWMFZcLCIVHBxcBBEBxHdnDop uGh43pdU2iLex+X9OJxzuVzAG1AZK/YCKOmWkUzEpLXUuuR7g4eeU6pmsqiiLAr+/bvr89H13k+I WU27dhDZT1yXzi6Xdp4CU3/9XdWfyZoa/d/UQY0ZFuCRiZVtiwneJR4xaCniquC8y8eC0y6fO56V ZJz4lljSCmqGuEkspzv0fAeXimWttYPY3p/VV5fFHOpRzGETJhiKUFGBBAXhf/zTjj+OLXJXYFAu jwIsykRJEROyxPPQoWESMnEIQeqQuHPrfg+t+8ltbe8VmG1wzi/a2kIDOJ2hk9Xb2ngEGBoAbupM NVRH6qH25nLA+wkwmAKG7yizYebCIXd7fwzoe+H8YwzwHQJ2lfOvI87tGoWfgSv9BxcparzsG/Vj AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAD/AP8A /6C9p5MAAAGfelRYdFJhdyBwcm9maWxlIHR5cGUgaWNjAAA4jZVTWY7lMAj89ynmCJjVOY63SHP/ CwzenjKt91rdSJETwEVRkPC31vBnmJAGGIYxaTQw0Ao8PaBNu7GhIBsjgiS5JCOAdfVw3M/LgkYl IwOOAgJcT+Dr93d2e9XwRG6E7TDr9W6ZUqeUhK2StsKl8W255Zjw/goWflLxYVlZxUhpc9mMyVvz tgxtKRNxBwTMXCE4ftv+OFSbaq3PC44/qD0DmU9A/7tQ0gOIfQCLUay7AA5G6hPTXbmfQNUPF7zw B6Cm1eT0/LIzgKqiXUToMNqnA7C/q/dmHrMhtu8OqF+0ayAPfVw8+l0B4vCo4E69B/oCNVwV1R3q Gg3hRyGOOwc2CZmteWAkd38cCPvQZ10gHGPdJ742+2G+iHJYTka+iPVdYqI2F49auZeV8i6Pc7kn UIlk05PL9S4RE83xxwhlCpTK5dsfDfX1VwygIyiq26SMeQE3mRsXqa2MLMW3WonoWSlCZVxiS+uT OeEEcq0n+N0uWB1lnKf/fWtIbe5PdW3DP2no7DraN5okAAABZnpUWHRSYXcgcHJvZmlsZSB0eXBl IHhtcAAAKJF9U0t2wzAI3HOKHkEGBNJxVEva9b0ue/yCHH8qu7FeYgcYZphg+Pn6hg+/ODPQqomK JqkapEpUlgWD/5ZVmpLnqCLKIixdUCKVLX5Ud0QMcLax4KdDYuIaAwYm6WpADCTYKIwPUgsFgx+T gNZcqERkBpaJf0u6hqRsJ1Axzq7jwqZWhG1QKHZaKPvBDhQILYD2XbcmdifN1tZka8LqBJ4+tcyK mCWCkpAF8hgtmwvNFL4KzBc0bnPCFZoRfxpdjyY4hzLrkrV6GGtoaqfd9mz+SbXMC+OjLcPE/p7v 4qHrljsdvOPbQW7qTjc7tfsFx0AlBnMqSZQ1ZvYWtidOsjlHzf6hRJHWc6ArBp5Bz6yPpGnDw8TK thX4H+sOeiKFmfUws7AvXR4g3yi+jLie/u11cC+c1w77dfHue7chYC7294bFkyN6e6E9A79lPOuU M3OVXwAAAAFvck5UAc+id5oAACSSSURBVHja7d15uBxVmcfxb9+bEEgCWdh3cGGTVRQQETMwKqij IERUXDIuiICOC+6ouOs4owiIiALjhgiKigqjsgVwAWUT2VxAFJSdECAha88f7+25nU7XOe9bXd2V ht/neepRcqtPnequ7qpzznveAyIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi IiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi IiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi IiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi IiIiItJvjbor0CfrA9sCG7dt04B5wF3AN4E7666kiIjIE9EI8CLgR8BSoJnY7gX2q7vCIiIiTyQz gA8DfyN9k+7clgBb1F15ERGRJ4KDgLuJ3ajbt+PqPoGABrAbsD2wWt2VERER8VgdOIXyN+rWdifD MY7fAL7aVu9/AHvVXSkREZGUdYAr6P1m3dq2rfuEHF7bpd43110pERGRIlOAa6juZt0Enlf3SWVM wyLbu9X9aXVXTkREBmOk7goE6/ptYGfHvsuAk4BzHPtuVPeJZbwPm6bWzcvqrpyIiEin9+BrMd8K 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 fqzl+bhdOaoih7DyFLQfYw/mvb539zK+NkDLQqyX49MMWR5xGJ4b9ibEE/WX9RHgY859R7Cuqh2w 9Wg3xL7Ia2Ljgq1kKA9jXTAPYQt23Da23c74IhIN7AueinBfgnWR9SvrVF0a2Phwt/SRrR/EKruu FuCf1/9tLGBKVlGHnPnWnUZG+dcmy2c2ac798wNLL77qzad4FmeR+m2K9UK0pnbOxdYdjySRKvIa rFv9z1j3+GVYw2+VGuZ5PNoYe9ObA9j2cNapH1q5d4u2z9RYt37bHOtx6Dznn/fhWL9mOK4HkSeK mRQvmStD6qnYmMd5wANUf7NeSLkF1atyQKJuf2Tw2d4G7esd57yU+Hizx7PxXQ9X1f2GiIi0DEuX eFHdt8KyBT0Ji3Kd3LGt5jjHJVj3y2KsFV/16jYRo1iE8M5t/9bEokvfz2Ajt+vQPp51DTZ97do+ Hesuuuclvx3rPrsI66Yvm2taREQe5/bAxrfvxhK/7FZ3hQZoCjbF6HWUS3QT8W5WblGfzOO/F0NE RGSoNICjsZb0hQxunr+IiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiI iIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiI iIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiI iIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIjf/wEMs4EKhwVplgAAAERlWElmTU0AKgAA AAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAAqACAAQAAAABAAAB7KADAAQAAAABAAAA uQAAAAAnYMKQAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTAxLTE0VDExOjExOjEzKzAwOjAwR99k YAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0wMS0xNFQxMToxMToxMyswMDowMDaC3NwAAAAodEVY dGRhdGU6dGltZXN0YW1wADIwMjQtMDEtMTRUMTE6MTE6MTMrMDA6MDBhl/0DAAAAEnRFWHRleGlm OkV4aWZPZmZzZXQAMzituL4jAAAAGHRFWHRleGlmOlBpeGVsWERpbWVuc2lvbgA0OTJ/NVjjAAAA GHRFWHRleGlmOlBpeGVsWURpbWVuc2lvbgAxODVjjt+cAAAAKHRFWHRpY2M6Y29weXJpZ2h0AENv cHlyaWdodCBBcHBsZSBJbmMuLCAyMDIy5LS/nAAAABp0RVh0aWNjOmRlc2NyaXB0aW9uAERpc3Bs YXkgUDOPebu8AAAAEnRFWHR0aWZmOk9yaWVudGF0aW9uADG3q/w7AAAAF3RFWHR4bXA6UGl4ZWxY RGltZW5zaW9uADQ5MmU6FW4AAAAXdEVYdHhtcDpQaXhlbFlEaW1lbnNpb24AMTg1eYGSEQAAAABJ RU5ErkJggg=="
          />
        </svg>
      </Link>
      <div>
        <Link
          to="/tags"
          className="text-body-4 text-gray-7 pc:hover:text-green"
        >
          <FaTags />
        </Link>
      </div>
    </header>
  );
};

export default Header;
