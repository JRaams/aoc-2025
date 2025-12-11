{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShell = pkgs.mkShell {
          nativeBuildInputs = with pkgs; [
            bun         # 1.3.2   (2025-11-08)
            gnuplot     # 6.0.3   (2025-06-03)
            hyperfine   # 1.19.0  (2024-11-11)
            imagemagick # 7.1.2-8 (2025-11-30) 
            nodejs_24   # 24.11.1 (2025-11-12)
          ];

          shellHook = ''
            export REPO_ROOT=$(git rev-parse --show-toplevel)

            alias bench='hyperfine -w 3 "bun run a.ts" "bun run b.ts"'

            alias plot='(cd "$REPO_ROOT/gnuplot" && ./plot)'
          '';
        };
      }
    );
}