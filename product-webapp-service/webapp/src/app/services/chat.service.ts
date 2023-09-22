import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat.model';
import { Message } from '../models/message.model';
import { Chatting } from '../models/newChat.model';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = "http://localhost:8004";
  constructor(private http : HttpClient){}
  // getChatByUserEmailId 
  public GetChatById(Email:string):Observable<Chat>{
    return this.http.get<Chat>(this.url+'/Chat/Get/'+Email)
 }
  public getChats():Observable<Chat[]>{
    return this.http.get<Chat[]>(this.url+'/Chat/GetChats')
  }
  public AddMessage(Email:string , mesg : Message):Observable<Message>{
    return this.http.put<Message>(this.url+'/Chat/'+ Email +'/AddMessage',mesg);
  }
  public DeleteMessage(Email:string ,DateStamp:string,TimeStamp:string):Observable<any>{
    return this.http.put<any>(this.url+'/Chat/DeleteMessage/'+Email+'/'+DateStamp+'/'+TimeStamp,{});
  }
  public AddFile (Email:string , senderMail :string ,file:Blob , filename : string):Observable<any>{
    let formData = new FormData();
    formData.append("file", file);
    console.log(senderMail)
    return this.http.put<any>(this.url+'/Chat/UploadFile/'+ Email+'/'+ senderMail +'/'+ filename, formData);
  }
  public downloadFile(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }
  public AddChat(newChat:Chatting):Observable<Chat>
  {
    return this.http.post<Chat>(this.url+'/Chat/Add/',newChat)
  }
}
