import { create } from "zustand";
import { persist } from "zustand/middleware";
import {jwtDecode} from "jwt-decode";
import type { User } from "../dto/User";
import type {DecodedToken} from "../dto/DecodedToken.ts";

interface AuthState{
    user:User | null;
    accessToken:string | null;
    refreshToken:string | null;
    isAuthenticated:boolean;
    setAuth:(accessToken:string,refreshToken:string) => void;
    clearAuth:() => void;
}

export const useAuthStore =
    create<AuthState>()(
        persist(
            (set) => ({
                user:null,
                accessToken:null,
                refreshToken:null,
                isAuthenticated:false,
                setAuth:(accessToken:string,refreshToken:string) => {
                    try{
                        const decoded =
                            jwtDecode<DecodedToken>(accessToken);
                        set({
                            accessToken,
                            refreshToken,
                            isAuthenticated:true,
                            user:{
                                username:decoded.sub,
                                roles:decoded.roles
                            }
                        })
                    }catch {
                        set({user:null,
                            accessToken:null,
                            refreshToken:null,
                            isAuthenticated:false});
                    }
                },
                clearAuth:() => {
                    set({
                        user:null,
                        accessToken:null,
                        refreshToken:null,
                        isAuthenticated:false
                    })
                }
            }),{
                name:"auth-storage"
            }
        )
    );