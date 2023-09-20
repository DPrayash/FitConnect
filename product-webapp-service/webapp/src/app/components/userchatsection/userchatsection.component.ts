import { Component ,OnInit } from '@angular/core';
import { Message} from 'src/app/models/message.model';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';
import { Chatting } from 'src/app/models/newChat.model';
@Component({
  selector: 'app-userchatsection',
  templateUrl: './userchatsection.component.html',
  styleUrls: ['./userchatsection.component.css']
})
export class UserchatsectionComponent implements OnInit{
  constructor(private chatservice:ChatService) {

  }
  selectedChat: Chat | null = null; // here get chat of current logged in user chat
  newMessage: string = '';
  messages: Message[] = [];
  chatList: Chat[] = [];
  filename:string =''
  userEmail:string = 'hello@gmail.com'
  ngOnInit(): void {
      //  get chat by userEmail Id 
      // push it to the chatList
      setInterval(()=>{
        this.getChatByEmail(this.userEmail)
      },5000)
   
    
  }

  selectChat(chat: Chat) {
    this.selectedChat = chat;
    this.messages = chat.chatMessage;
  }

  sendMessage() {
    const currentDate = new Date();

    // Get the current time components
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    // Format the time as "HH:MM:SS"
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    if (this.selectedChat && this.newMessage) {
      const message: Message = {
        senderEmail: this.selectedChat.chatUserEmail,
        senderMessage: this.newMessage,
        senderMediaLinks: [],
        timeStamp: formattedTime,
        dateStamp: null

      }
      if (this.messages === null){
        this.messages = [message]
       }
       else{
        this.messages.push(message)
        
       }
       this.newMessage = '';
      this.chatservice.AddMessage(this.selectedChat.chatUserEmail,message).subscribe(
        (res)=>{
             
        }
      )
    }
    
  }

  deleteMessage(message: Message) {
    const index = this.messages.indexOf(message);
    if (index !== -1) {
      this.messages.splice(index, 1);
    }
    this.chatservice.DeleteMessage(this.selectedChat?.chatUserEmail,message.dateStamp,message.timeStamp).subscribe(
      (data)=>{
        
      }
    )
   
  }
  onAttachmentSelect(event: any) {
    const selectedFile = event.target.files[0];
    
    this.filename =  selectedFile.name;
    this.chatservice.AddFile(this.selectedChat?.chatUserEmail,this.selectedChat?.chatUserEmail,selectedFile ,this.filename).subscribe((data)=>{
      
      this.messages.push(data.chatMessage[data.chatMessage.length-1]);
    })

  }
  getChatByEmail(Email:string)
  {
    this.chatservice.GetChatById(Email).subscribe((chat)=>
    {
     
      
      this.selectedChat =  chat ;
      this.messages =  this.selectedChat.chatMessage;
    },(err)=>{
     this.AddChat(Email);
    })   
  }
  downloadImageOrPDF(Url:string) {
    const url = Url; // Replace with the actual file URL
    this.chatservice.downloadFile(url).subscribe(
      (fileBlob) => {
        const blobUrl = URL.createObjectURL(fileBlob);

        // Create a hidden anchor element to trigger the download
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'File'; // Specify the desired file name
        a.style.display = 'none';
        document.body.appendChild(a);

        // Trigger the download
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      },
      (error) => {
        console.error('Failed to download file:', error);
      }
    );
  }
  AddChat(email:string)
  {
    const createChat:Chatting ={
      chatUserEmail:email
    }
    this.chatservice.AddChat(createChat).subscribe((NewChat)=>{
      
    this.getChatByEmail(email);
    },(err)=>{
      console.log(err)
    })
  }
}